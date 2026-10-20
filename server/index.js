import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3001

// Queue of users looking for a chat:
// Array<{ socketId: string, name: string, school: string, matchPreference: 'any' | 'same' | 'different' }>
let waitingQueue = []

// Map active pairs: socketId -> partnerSocketId
const activePairs = new Map()

// Map socketId -> user profile metadata
const connectedUsers = new Map()

function isCompatible(userA, userB) {
  if (userA.socketId === userB.socketId) return false

  // Check userA preference
  if (userA.matchPreference === 'same' && userA.school.toLowerCase() !== userB.school.toLowerCase()) {
    return false
  }
  if (userA.matchPreference === 'different' && userA.school.toLowerCase() === userB.school.toLowerCase()) {
    return false
  }

  // Check userB preference
  if (userB.matchPreference === 'same' && userB.school.toLowerCase() !== userA.school.toLowerCase()) {
    return false
  }
  if (userB.matchPreference === 'different' && userB.school.toLowerCase() === userA.school.toLowerCase()) {
    return false
  }

  return true
}

function broadcastOnlineCount() {
  io.emit('online_count', io.engine.clientsCount)
}

io.on('connection', (socket) => {
  console.log(`[Socket Connected] ${socket.id}`)
  broadcastOnlineCount()

  // 1. Join matchmaking queue
  socket.on('join_queue', ({ name, school, matchPreference }) => {
    // If socket was already in an active chat, cleanly leave it first
    leaveCurrentChat(socket.id)

    // Remove from existing queue if already queued
    waitingQueue = waitingQueue.filter((u) => u.socketId !== socket.id)

    const currentUser = {
      socketId: socket.id,
      name: name?.trim() || 'Anonymous Student',
      school: school?.trim() || 'Other School',
      matchPreference: matchPreference || 'any',
    }

    connectedUsers.set(socket.id, currentUser)

    // Try to find a matching partner in the waiting queue
    const matchIndex = waitingQueue.findIndex((candidate) => isCompatible(currentUser, candidate))

    if (matchIndex !== -1) {
      const partner = waitingQueue.splice(matchIndex, 1)[0]
      const partnerSocket = io.sockets.sockets.get(partner.socketId)

      if (partnerSocket && partnerSocket.connected) {
        // Set bidirectional pairing
        activePairs.set(socket.id, partner.socketId)
        activePairs.set(partner.socketId, socket.id)

        // Notify both parties of successful match
        socket.emit('match_found', {
          partnerName: partner.name,
          partnerSchool: partner.school,
        })

        partnerSocket.emit('match_found', {
          partnerName: currentUser.name,
          partnerSchool: currentUser.school,
        })

        console.log(
          `[Matched] ${currentUser.name} (${currentUser.school}) <---> ${partner.name} (${partner.school})`,
        )
        return
      }
    }

    // No suitable match found, add to waiting queue
    waitingQueue.push(currentUser)
    socket.emit('queue_waiting', { message: 'Looking for a fellow student...' })
    console.log(`[Queued] ${currentUser.name} (${currentUser.school}) - Preference: ${currentUser.matchPreference}`)
  })

  // 2. Cancel queue
  socket.on('leave_queue', () => {
    waitingQueue = waitingQueue.filter((u) => u.socketId !== socket.id)
    socket.emit('queue_left')
    console.log(`[Queue Left] ${socket.id}`)
  })

  // 3. Send message to matched partner
  socket.on('send_message', ({ text }) => {
    const partnerId = activePairs.get(socket.id)
    if (!partnerId) return

    const partnerSocket = io.sockets.sockets.get(partnerId)
    if (partnerSocket && partnerSocket.connected) {
      const messageId = Date.now() + Math.random()
      partnerSocket.emit('receive_message', {
        id: messageId,
        sender: 'them',
        text,
      })
    }
  })

  // 4. Typing indicator
  socket.on('typing', () => {
    const partnerId = activePairs.get(socket.id)
    if (partnerId) {
      io.to(partnerId).emit('partner_typing')
    }
  })

  socket.on('stop_typing', () => {
    const partnerId = activePairs.get(socket.id)
    if (partnerId) {
      io.to(partnerId).emit('partner_stop_typing')
    }
  })

  // 5. Leave chat or Skip
  socket.on('leave_chat', () => {
    leaveCurrentChat(socket.id)
  })

  // 6. Handle disconnection
  socket.on('disconnect', () => {
    console.log(`[Socket Disconnected] ${socket.id}`)
    waitingQueue = waitingQueue.filter((u) => u.socketId !== socket.id)
    leaveCurrentChat(socket.id)
    connectedUsers.delete(socket.id)
    broadcastOnlineCount()
  })
})

function leaveCurrentChat(socketId) {
  const partnerId = activePairs.get(socketId)
  if (partnerId) {
    const partnerSocket = io.sockets.sockets.get(partnerId)
    if (partnerSocket && partnerSocket.connected) {
      partnerSocket.emit('partner_disconnected')
    }
    activePairs.delete(partnerId)
    activePairs.delete(socketId)
  }
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    online: io.engine.clientsCount,
    waiting: waitingQueue.length,
    activeChats: activePairs.size / 2,
  })
})

server.listen(PORT, () => {
  console.log(`> ChatUs Matchmaking Server running on http://localhost:${PORT}`)
})


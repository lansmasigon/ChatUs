import { useEffect, useMemo, useRef, useState } from 'react'
import BrandHeader from './components/BrandHeader'
import IntroForm from './components/IntroForm'
import ChatWindow, { type ChatMessage } from './components/ChatWindow'
import WaitingRoom from './components/WaitingRoom'
import type { MatchPreference } from './data/schools'
import { socket } from './socket'
import './App.css'

type Screen = 'form' | 'waiting' | 'chat'

function App() {
  const [screen, setScreen] = useState<Screen>('form')
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [matchPreference, setMatchPreference] = useState<MatchPreference>('any')
  const [accepted, setAccepted] = useState(false)

  // Real-time server state
  const [onlineCount, setOnlineCount] = useState(1)
  const [partnerName, setPartnerName] = useState('')
  const [partnerSchool, setPartnerSchool] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [isPartnerTyping, setIsPartnerTyping] = useState(false)
  const [isChatEnded, setIsChatEnded] = useState(false)
  const [endPressCount, setEndPressCount] = useState(0)

  const messageIdRef = useRef(0)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const previewName = useMemo(() => (name.trim() ? name.trim() : 'Your Name'), [name])
  const previewSchool = useMemo(() => (school.trim() ? school.trim() : 'Your School / Campus'), [school])

  useEffect(() => {
    // 1. Online count
    socket.on('online_count', (count: number) => {
      setOnlineCount(count)
    })

    // 2. Match found event
    socket.on('match_found', ({ partnerName, partnerSchool }: { partnerName: string; partnerSchool: string }) => {
      setPartnerName(partnerName)
      setPartnerSchool(partnerSchool)
      setMessages([])
      setIsChatEnded(false)
      setEndPressCount(0)
      setIsPartnerTyping(false)
      setScreen('chat')
    })

    // 3. Receive message from partner
    socket.on('receive_message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    })

    // 4. Partner typing events
    socket.on('partner_typing', () => {
      setIsPartnerTyping(true)
    })

    socket.on('partner_stop_typing', () => {
      setIsPartnerTyping(false)
    })

    // 5. Partner disconnected
    socket.on('partner_disconnected', () => {
      setIsChatEnded(true)
      setIsPartnerTyping(false)
    })

    // 6. Queue error
    socket.on('queue_error', ({ message }: { message: string }) => {
      alert(message || 'Unable to join queue. Please try again.')
      setScreen('form')
    })

    return () => {
      socket.off('online_count')
      socket.off('match_found')
      socket.off('receive_message')
      socket.off('partner_typing')
      socket.off('partner_stop_typing')
      socket.off('partner_disconnected')
      socket.off('queue_error')
    }
  }, [])

  // Join the queue to find a student
  const handleFindMatch = () => {
    if (!name.trim() || !school.trim() || !accepted) return

    setMessages([])
    setDraft('')
    setEndPressCount(0)
    setIsChatEnded(false)
    setScreen('waiting')

    socket.emit('join_queue', {
      name: name.trim(),
      school: school.trim(),
      matchPreference,
    })
  }

  // Cancel waiting in queue
  const handleCancelQueue = () => {
    socket.emit('leave_queue')
    setScreen('form')
  }

  // Send message to partner
  const handleSend = () => {
    if (!draft.trim() || isChatEnded) return

    const trimmed = draft.trim()
    messageIdRef.current += 1
    const nextMessage: ChatMessage = {
      id: messageIdRef.current,
      sender: 'me',
      text: trimmed,
    }

    setMessages((prev) => [...prev, nextMessage])
    socket.emit('send_message', { text: trimmed })
    setDraft('')
    handleStopTyping()
  }

  // Typing indicators
  const handleTyping = () => {
    if (isChatEnded) return
    socket.emit('typing')

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing')
    }, 1500)
  }

  const handleStopTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    socket.emit('stop_typing')
  }

  // Two-step End / Skip guard
  const handleEndOrSkip = () => {
    if (isChatEnded) {
      handleNextMatch()
      return
    }

    if (endPressCount === 0) {
      setEndPressCount(1)
      return
    }

    // Second press ends the chat
    socket.emit('leave_chat')
    setIsChatEnded(true)
    setEndPressCount(0)
  }

  // Skip directly to next student
  const handleNextMatch = () => {
    socket.emit('leave_chat')
    setMessages([])
    setDraft('')
    setEndPressCount(0)
    setIsChatEnded(false)
    setScreen('waiting')

    socket.emit('join_queue', {
      name: name.trim(),
      school: school.trim(),
      matchPreference,
    })
  }

  // Return to setup screen
  const handleBack = () => {
    socket.emit('leave_chat')
    socket.emit('leave_queue')
    setScreen('form')
    setDraft('')
    setEndPressCount(0)
    setIsChatEnded(false)
    setIsPartnerTyping(false)
  }

  return (
    <div className="app-shell">
      <BrandHeader count={onlineCount} />

      {screen === 'form' && (
        <IntroForm
          name={name}
          school={school}
          matchPreference={matchPreference}
          accepted={accepted}
          previewName={previewName}
          previewSchool={previewSchool}
          onNameChange={setName}
          onSchoolChange={setSchool}
          onMatchPreferenceChange={setMatchPreference}
          onAcceptedChange={setAccepted}
          onSubmit={handleFindMatch}
        />
      )}

      {screen === 'waiting' && (
        <WaitingRoom
          userName={previewName}
          userSchool={previewSchool}
          matchPreference={matchPreference}
          onCancel={handleCancelQueue}
        />
      )}

      {screen === 'chat' && (
        <ChatWindow
          partnerName={partnerName}
          partnerSchool={partnerSchool}
          userName={name}
          userSchool={school}
          messages={messages}
          draft={draft}
          isPartnerTyping={isPartnerTyping}
          isChatEnded={isChatEnded}
          endPressCount={endPressCount}
          onDraftChange={setDraft}
          onSend={handleSend}
          onEndOrSkip={handleEndOrSkip}
          onBack={handleBack}
          onNextMatch={handleNextMatch}
          onTyping={handleTyping}
          onStopTyping={handleStopTyping}
        />
      )}
    </div>
  )
}

export default App

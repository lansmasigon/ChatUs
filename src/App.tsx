import { useMemo, useState } from 'react'
import BrandHeader from './components/BrandHeader'
import IntroForm from './components/IntroForm'
import ChatWindow from './components/ChatWindow'
import './App.css'

type Screen = 'form' | 'chat'

type ChatMessage = {
  id: number
  sender: 'me' | 'them'
  text: string
}

const strangerNames = [
  'Stranger',
  'Chat Buddy',
  'New Match',
  'Random User',
  'Connection',
  'Friend',
  'Guest',
  'Pal',
  'Match',
  'User',
]

function App() {
  const [screen, setScreen] = useState<Screen>('form')
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [endPressCount, setEndPressCount] = useState(0)
  const [isChatEnded, setIsChatEnded] = useState(false)

  const previewName = useMemo(() => (name.trim() ? name.trim() : 'Your Name'), [name])
  const previewSchool = useMemo(() => (school.trim() ? school.trim() : 'Random Stranger'), [school])
  const strangerName = useMemo(
    () => strangerNames[Math.floor(Math.random() * strangerNames.length)],
    [screen],
  )

  const handleSubmit = () => {
    if (!name.trim() || !accepted) return

    setMessages([])
    setDraft('')
    setEndPressCount(0)
    setIsChatEnded(false)
    setScreen('chat')
  }

  const handleSend = () => {
    if (!draft.trim()) return

    const nextMessage: ChatMessage = {
      id: Date.now(),
      sender: 'me',
      text: draft.trim(),
    }

    setMessages((current) => [...current, nextMessage])
    setDraft('')
  }

  const handleEnd = () => {
    if (!isChatEnded && endPressCount === 0) {
      setEndPressCount(1)
      return
    }

    setIsChatEnded(true)
    setEndPressCount(0)
  }

  const handleBack = () => {
    setScreen('form')
    setDraft('')
    setEndPressCount(0)
    setIsChatEnded(false)
  }

  const handleNewChat = () => {
    setScreen('form')
    setAccepted(false)
    setName('')
    setSchool('')
    setDraft('')
    setMessages([])
    setEndPressCount(0)
    setIsChatEnded(false)
  }

  return (
    <div className="app-shell">
      <BrandHeader count={4824} />

      {screen === 'form' ? (
        <IntroForm
          name={name}
          school={school}
          accepted={accepted}
          previewName={previewName}
          previewSchool={previewSchool}
          onNameChange={setName}
          onSchoolChange={setSchool}
          onAcceptedChange={setAccepted}
          onSubmit={handleSubmit}
        />
      ) : (
        <ChatWindow
          strangerName={strangerName}
          messages={messages}
          draft={draft}
          endPressCount={endPressCount}
          isChatEnded={isChatEnded}
          onDraftChange={setDraft}
          onSend={handleSend}
          onEnd={handleEnd}
          onBack={handleBack}
          onNewChat={handleNewChat}
        />
      )}
    </div>
  )
}

export default App
import { useEffect, useRef } from 'react'
import './ChatWindow.css'

export type ChatMessage = {
  id: number
  sender: 'me' | 'them'
  text: string
}

type ChatWindowProps = {
  partnerName: string
  partnerSchool: string
  userName: string
  userSchool: string
  messages: ChatMessage[]
  draft: string
  isPartnerTyping: boolean
  isChatEnded: boolean
  endPressCount: number
  onDraftChange: (value: string) => void
  onSend: () => void
  onEndOrSkip: () => void
  onBack: () => void
  onNextMatch: () => void
  onTyping: () => void
  onStopTyping: () => void
}

function ChatWindow({
  partnerName,
  partnerSchool,
  userName,
  userSchool,
  messages,
  draft,
  isPartnerTyping,
  isChatEnded,
  endPressCount,
  onDraftChange,
  onSend,
  onEndOrSkip,
  onBack,
  onNextMatch,
  onTyping,
  onStopTyping,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll on new messages or typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isPartnerTyping])

  return (
    <section className="chat-layout">
      <aside className="chat-panel">
        <div className="chat-shell">
          <div className="chat-header">
            <div className="chat-user-meta">
              <button
                type="button"
                className="back-button"
                onClick={onBack}
                aria-label="Go back to home screen"
                title="Return to setup"
              >
                ←
              </button>
              <div className="chat-avatar">{partnerName.charAt(0).toUpperCase()}</div>
              <div className="chat-user-info">
                <div className="chat-user-headline">
                  <span className="chat-user-name">{partnerName}</span>
                  <span className="school-badge">🏫 {partnerSchool}</span>
                </div>
                <div className={`chat-user-status ${isChatEnded ? 'offline' : ''}`}>
                  {isChatEnded
                    ? 'Disconnected'
                    : isPartnerTyping
                      ? 'Typing a message...'
                      : 'Online now'}
                </div>
              </div>
            </div>
          </div>

          <div className="chat-messages" aria-live="polite">
            <div className="system-pill">
              Connected with a student from <strong>{partnerSchool}</strong>. Say hi! 👋
            </div>

            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.sender}`}>
                {message.text}
              </div>
            ))}

            {isPartnerTyping && !isChatEnded && (
              <div className="chat-bubble them typing-bubble" aria-label="Partner is typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            {isChatEnded && (
              <div className="chat-ended-alert">
                <p>Chat session ended.</p>
                <button type="button" className="next-match-pill-button" onClick={onNextMatch}>
                  Find Next Student →
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="composer-wrap">
            <div className="composer">
              <input
                type="text"
                value={draft}
                disabled={isChatEnded}
                onChange={(event) => {
                  onDraftChange(event.target.value)
                  onTyping()
                }}
                onBlur={onStopTyping}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !isChatEnded) {
                    onSend()
                    onStopTyping()
                  }
                }}
                placeholder={isChatEnded ? 'Chat has ended' : 'Type a message... (Press Enter)'}
              />
              {isChatEnded ? (
                <button type="button" className="new-chat-button-inline" onClick={onNextMatch}>
                  Next Student
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="chat-end-button-inline"
                    onClick={onEndOrSkip}
                    title="Skip to next or end chat"
                  >
                    {endPressCount === 0 ? 'Skip / End' : 'Press again'}
                  </button>
                  <button
                    type="button"
                    className="composer-send"
                    onClick={() => {
                      onSend()
                      onStopTyping()
                    }}
                    disabled={!draft.trim()}
                    aria-label="Send chat message"
                  >
                    ➤
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="chat-side-panel">
        <div className="matchup-card">
          <div className="matchup-header">🎓 Campus Match</div>
          <div className="matchup-vs">
            <div className="matchup-person">
              <div className="person-label">You</div>
              <div className="person-name">{userName}</div>
              <div className="person-school">{userSchool}</div>
            </div>
            <div className="matchup-divider">VS</div>
            <div className="matchup-person">
              <div className="person-label">Partner</div>
              <div className="person-name">{partnerName}</div>
              <div className="person-school">{partnerSchool}</div>
            </div>
          </div>
        </div>

        <div className="icebreakers-card">
          <div className="icebreakers-title">💡 PH Campus Icebreakers</div>
          <ul className="icebreakers-list">
            <li>"Saan ang pinakamasarap na kainan / tambayan sa campus niyo?"</li>
            <li>"Kamusta ang semester / thesis deliverables niyo?"</li>
            <li>"Sino prof na may notorious reputation sa department niyo?"</li>
          </ul>
        </div>

        <div className="side-actions">
          <button type="button" className="side-skip-button" onClick={onNextMatch}>
            {isChatEnded ? 'Find Next Student →' : 'Skip & Next Student →'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ChatWindow

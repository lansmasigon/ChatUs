import './ChatWindow.css'

type ChatMessage = {
  id: number
  sender: 'me' | 'them'
  text: string
}

type ChatWindowProps = {
  strangerName: string
  messages: ChatMessage[]
  draft: string
  endPressCount: number
  isChatEnded: boolean
  onDraftChange: (value: string) => void
  onSend: () => void
  onEnd: () => void
  onBack: () => void
  onNewChat: () => void
}

function ChatWindow({
  strangerName,
  messages,
  draft,
  endPressCount,
  isChatEnded,
  onDraftChange,
  onSend,
  onEnd,
  onBack,
  onNewChat,
}: ChatWindowProps) {
  return (
    <section className="chat-layout">
      <aside className="chat-panel">
        <div className="chat-shell">
          <div className="chat-header">
            <div className="chat-user-meta">
              <button type="button" className="back-button" onClick={onBack} aria-label="Go back to edit name">
                ←
              </button>
              <div className="chat-avatar">{strangerName.charAt(0).toUpperCase()}</div>
              <div>
                <div className="chat-user-name">{strangerName}</div>
                <div className="chat-user-status">Online now</div>
              </div>
            </div>
          </div>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="composer-wrap">
            <div className="composer">
              <input
                type="text"
                value={draft}
                disabled={isChatEnded}
                onChange={(event) => onDraftChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !isChatEnded) onSend()
                }}
                placeholder={isChatEnded ? 'Chat ended' : 'Type a message...'}
              />
              {isChatEnded ? (
                <button type="button" className="new-chat-button-inline" onClick={onNewChat}>
                  New Chat
                </button>
              ) : (
                <>
                  <button type="button" className="chat-end-button-inline" onClick={onEnd}>
                    {endPressCount === 0 ? 'End' : 'Press again'}
                  </button>
                  <button type="button" className="composer-send" onClick={onSend} aria-label="Send chat message">
                    ➤
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="chat-blank-panel" aria-hidden="true">
        {isChatEnded ? (
          <button type="button" className="new-chat-button" onClick={onNewChat}>
            New Chat
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default ChatWindow

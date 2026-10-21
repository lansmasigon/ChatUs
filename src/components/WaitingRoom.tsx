import type { MatchPreference } from '../data/schools'
import './WaitingRoom.css'

type WaitingRoomProps = {
  userName: string
  userSchool: string
  matchPreference: MatchPreference
  onCancel: () => void
}

function WaitingRoom({ userName, userSchool, matchPreference, onCancel }: WaitingRoomProps) {
  const preferenceText =
    matchPreference === 'same'
      ? `Looking for students from ${userSchool}`
      : matchPreference === 'different'
        ? `Looking for students from other schools`
        : `Connecting you to any online student`

  return (
    <section className="waiting-shell">
      <div className="waiting-card">
        <div className="radar-wrap" aria-hidden="true">
          <div className="radar-ring" />
          <div className="radar-ring" />
          <div className="radar-ring" />
          <div className="radar-center-icon">🎓</div>
        </div>

        <h2 className="waiting-title">Finding a Match...</h2>
        <p className="waiting-subtitle">{preferenceText}</p>

        <div className="waiting-tags">
          <span className="waiting-tag">You: {userName}</span>
          <span className="waiting-tag">🏫 {userSchool}</span>
          <span className="waiting-tag">
            {matchPreference === 'same'
              ? '🎯 Same School'
              : matchPreference === 'different'
                ? '⚔️ Cross-School'
                : '🎲 Anyone in PH'}
          </span>
        </div>

        <button type="button" className="cancel-queue-button" onClick={onCancel}>
          Cancel Search
        </button>
      </div>
    </section>
  )
}

export default WaitingRoom

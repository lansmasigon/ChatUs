import { Turnstile } from '@marsidev/react-turnstile'
import { POPULAR_PH_SCHOOLS, MATCH_PREFERENCES, type MatchPreference } from '../data/schools'
import './IntroForm.css'

type IntroFormProps = {
  name: string
  school: string
  matchPreference: MatchPreference
  accepted: boolean
  turnstileToken: string | null
  previewName: string
  previewSchool: string
  onNameChange: (value: string) => void
  onSchoolChange: (value: string) => void
  onMatchPreferenceChange: (value: MatchPreference) => void
  onAcceptedChange: (value: boolean) => void
  onTurnstileChange: (token: string | null) => void
  onSubmit: () => void
}

function IntroForm({
  name,
  school,
  matchPreference,
  accepted,
  turnstileToken,
  previewName,
  previewSchool,
  onNameChange,
  onSchoolChange,
  onMatchPreferenceChange,
  onAcceptedChange,
  onTurnstileChange,
  onSubmit,
}: IntroFormProps) {
  const quickSchools = [
    'UP Diliman',
    'Ateneo de Manila',
    'DLSU Manila',
    'UST',
    'PUP Manila',
    'FEU Manila',
    'Mapúa',
  ]

  const turnstileSiteKey =
    import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '0x4AAAAAAFds7_2tkkHLrDGS'

  return (
    <section className="intro-shell">
      <div className="intro-card">
        <h1>Connect with PH Students</h1>
        <p className="intro-tagline">
          Random 1-on-1 chat for college &amp; university students across the Philippines.
        </p>

        <div className="field-group">
          <label htmlFor="name" className="field-label">
            <span>Your Name or Alias</span>
            <span className="asterisk">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="e.g. Isko, Archie, Tomasino, Lasallian..."
            maxLength={30}
          />
        </div>

        <div className="field-group">
          <label htmlFor="school" className="field-label field-label-inline">
            <span>Your School / University</span>
            <span className="asterisk">*</span>
          </label>
          <input
            id="school"
            type="text"
            list="ph-schools-list"
            value={school}
            onChange={(event) => onSchoolChange(event.target.value)}
            placeholder="Type or select your campus (e.g. UST, UP, DLSU...)"
          />
          <datalist id="ph-schools-list">
            {POPULAR_PH_SCHOOLS.map((s) => (
              <option key={s.id} value={s.shortName}>
                {s.name}
              </option>
            ))}
          </datalist>

          <div className="quick-schools-chips" aria-label="Popular campuses">
            {quickSchools.map((qs) => (
              <button
                key={qs}
                type="button"
                className={`chip-button ${school === qs ? 'active' : ''}`}
                onClick={() => onSchoolChange(qs)}
              >
                {qs}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">
            <span>Matching Preference</span>
          </label>
          <div className="preference-group">
            {MATCH_PREFERENCES.map((pref) => {
              const isSelected = matchPreference === pref.id
              return (
                <button
                  key={pref.id}
                  type="button"
                  className={`preference-card ${isSelected ? 'active' : ''}`}
                  onClick={() => onMatchPreferenceChange(pref.id)}
                >
                  <div className="preference-label">{pref.label}</div>
                  <div className="preference-desc">{pref.description}</div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="preview-wrap">
          <div className="preview-label">LIVE STUDENT BADGE:</div>
          <div className="preview-box">
            <div className="preview-avatar">{previewName.charAt(0).toUpperCase()}</div>
            <div className="preview-user-wrap">
              <div className="preview-user">{previewName}</div>
              <div className="preview-school">🏫 {previewSchool}</div>
            </div>
          </div>
        </div>

        <label className="terms-row">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => onAcceptedChange(event.target.checked)}
          />
          <span>
            I agree to keep chats respectful and follow the{' '}
            <a href="#guidelines" onClick={(e) => e.preventDefault()}>
              Community Guidelines
            </a>
            .
          </span>
        </label>

        <div className="turnstile-wrap">
          <Turnstile
            siteKey={turnstileSiteKey}
            onSuccess={(token) => onTurnstileChange(token)}
            onExpire={() => onTurnstileChange(null)}
            onError={() => onTurnstileChange(null)}
            options={{
              action: 'join_chat',
              theme: 'light',
              size: 'normal',
            }}
          />
        </div>

        <button
          type="button"
          className="submit-button"
          onClick={onSubmit}
          disabled={!name.trim() || !school.trim() || !accepted || !turnstileToken}
        >
          Find a Match &amp; Start Chatting <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default IntroForm

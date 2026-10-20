import './IntroForm.css'

type IntroFormProps = {
  name: string
  school: string
  accepted: boolean
  previewName: string
  previewSchool: string
  onNameChange: (value: string) => void
  onSchoolChange: (value: string) => void
  onAcceptedChange: (value: boolean) => void
  onSubmit: () => void
}

function IntroForm({
  name,
  school,
  accepted,
  previewName,
  previewSchool,
  onNameChange,
  onSchoolChange,
  onAcceptedChange,
  onSubmit,
}: IntroFormProps) {
  return (
    <section className="intro-shell">
      <div className="intro-card">
        <h1>Introduce Yourself</h1>

        <div className="field-group">
          <label htmlFor="name" className="field-label">
            <span>Your Name or Nickname</span>
            <span className="asterisk">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="field-group">
          <label htmlFor="school" className="field-label field-label-inline">
            <span>School / University / College</span>
            <span className="optional-chip">Optional</span>
          </label>
          <input
            id="school"
            type="text"
            value={school}
            onChange={(event) => onSchoolChange(event.target.value)}
            placeholder="Enter your school (optional)"
          />
        </div>

        <div className="preview-wrap">
          <div className="preview-label">PREVIEW:</div>
          <div className="preview-box">
            <div className="preview-avatar">D</div>
            <div className="preview-user-wrap">
              <div className="preview-user">{previewName}</div>
              <div className="preview-school">{previewSchool}</div>
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
            I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Community Guidelines</a>
          </span>
        </label>

        <button type="button" className="submit-button" onClick={onSubmit} disabled={!name.trim() || !accepted}>
          Enter Chat &amp; Connect Randomly <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default IntroForm

import './BrandHeader.css'

type BrandHeaderProps = {
  count: number
}

function BrandHeader({ count }: BrandHeaderProps) {
  return (
    <header className="top-bar">
      <div className="brand-logo">ChatUs</div>
      <div className="online-pill" aria-label="Users online">
        <span className="online-dot" aria-hidden="true" />
        <span>{count.toLocaleString()}</span>
        <span className="online-label">online</span>
      </div>
    </header>
  )
}

export default BrandHeader

export default function Portal({ phase, onEnter }) {
  const expanded = phase !== 'portal';
  const flashing = phase === 'flash' || phase === 'revealed' || phase === 'done';
  const fading = phase === 'revealed' || phase === 'done';
  const gone = phase === 'done';

  return (
    <div
      id="portal"
      className={`${flashing ? 'flash' : ''} ${gone ? 'gone' : ''}`.trim()}
      style={fading && !gone ? { opacity: 0 } : undefined}
    >
      <div className="portal-ring" aria-hidden="true" style={expanded ? { opacity: 0, transition: 'opacity .4s' } : undefined} />
      <div className="portal-ring" aria-hidden="true" style={expanded ? { opacity: 0, transition: 'opacity .4s' } : undefined} />
      <div className="portal-ring" aria-hidden="true" style={expanded ? { opacity: 0, transition: 'opacity .4s' } : undefined} />
      <div className="portal-ring" aria-hidden="true" style={expanded ? { opacity: 0, transition: 'opacity .4s' } : undefined} />
      <button
        id="portal-btn"
        className={expanded ? 'expand' : ''}
        aria-label="Open portfolio"
        onClick={onEnter}
        disabled={expanded}
      >
        <span>ENTER</span>
      </button>
    </div>
  );
}

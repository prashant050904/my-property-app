export default function ConciergeSection() {
  return (
    <div className="concierge-section">
      <div style={{ flex: 1 }}>
        <p className="concierge-label">Personalized Concierge</p>
        <h2 className="concierge-h2">
          Can't find your<br />sanctuary? Let<br />us curate for<br />you.
        </h2>
        <p className="concierge-body" style={{ marginTop: '16px' }}>
          Our premium advisors will find the perfect match based on your lifestyle preferences.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn-connect">Connect Now</button>
      </div>
    </div>
  );
}

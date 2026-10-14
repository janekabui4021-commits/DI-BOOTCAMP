import { useSelector } from 'react-redux';

function AgeDisplay() {
  const { age, loading, error } = useSelector((state) => state.age);

  return (
    <section className="age-display" aria-labelledby="age-heading" aria-busy={loading}>
      <div className="display-topline">
        <span className="eyebrow">YOUR CURRENT AGE</span>
        <span className={`status ${loading ? 'status-updating' : ''}`}>
          <span className="status-dot" aria-hidden="true" />
          {loading ? 'Updating' : 'Up to date'}
        </span>
      </div>
      <h2 id="age-heading" className="age-value" aria-live="polite">
        {loading ? <span className="spinner" aria-label="Updating age" /> : age}
      </h2>
      <p className="age-caption">{loading ? 'One moment, please.' : 'years old'}</p>
      {error && <p className="error-message" role="alert">{error}</p>}
    </section>
  );
}

export default AgeDisplay;

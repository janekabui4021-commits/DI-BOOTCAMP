function LanguageVote({ language, totalVotes, onVote }) {
  const percentage = totalVotes === 0
    ? 0
    : Math.round((language.votes / totalVotes) * 100);

  return (
    <article className="language-row">
      <div className="language-details">
        <div>
          <h3>{language.name}</h3>
          <p>{language.votes} {language.votes === 1 ? 'vote' : 'votes'}</p>
        </div>
        <button type="button" onClick={onVote} aria-label={`Vote for ${language.name}`}>
          Vote
        </button>
      </div>
      <div className="result-line">
        <div
          className="result-track"
          role="progressbar"
          aria-label={`${language.name} share of votes`}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={percentage}
        >
          <div className="result-fill" style={{ width: `${percentage}%` }} />
        </div>
        <span>{percentage}%</span>
      </div>
    </article>
  );
}

export default LanguageVote;
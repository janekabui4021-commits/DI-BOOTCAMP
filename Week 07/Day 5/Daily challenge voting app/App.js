import { useState } from 'react';
import LanguageVote from './src/Components/LanguageVote.jsx';

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ]);

  const addVote = (languageName) => {
    setLanguages((currentLanguages) => currentLanguages.map((language) => (
      language.name === languageName
        ? { ...language, votes: language.votes + 1 }
        : language
    )));
  };

  const totalVotes = languages.reduce((total, language) => total + language.votes, 0);

  return (
    <main className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">Week 7 / Day 5 / Daily Challenge</p>
        <h1>Language Vote</h1>
        <p className="intro">Which programming language gets your vote?</p>
      </header>

      <section className="vote-board" aria-labelledby="vote-heading">
        <div className="board-heading">
          <div>
            <p className="eyebrow">Community poll</p>
            <h2 id="vote-heading">Choose your favorite</h2>
          </div>
          <p className="vote-count" aria-live="polite">
            <strong>{totalVotes}</strong>
            <span>{totalVotes === 1 ? 'total vote' : 'total votes'}</span>
          </p>
        </div>

        <div className="language-list">
          {languages.map((language) => (
            <LanguageVote
              key={language.name}
              language={language}
              totalVotes={totalVotes}
              onVote={() => addVote(language.name)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
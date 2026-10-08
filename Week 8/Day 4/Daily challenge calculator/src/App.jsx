import { useState } from 'react';

const operations = {
  add: { label: 'Addition', symbol: '+', calculate: (a, b) => a + b },
  subtract: { label: 'Subtraction', symbol: '−', calculate: (a, b) => a - b },
  multiply: { label: 'Multiplication', symbol: '×', calculate: (a, b) => a * b },
  divide: { label: 'Division', symbol: '÷', calculate: (a, b) => a / b },
};

function App() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function clearOutput() {
    setResult(null);
    setError('');
  }

  function calculate(event) {
    event.preventDefault();
    clearOutput();

    if (firstNumber.trim() === '' || secondNumber.trim() === '') {
      setError('Enter a value in both number fields to continue.');
      return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setError('Enter valid finite numbers in both fields.');
      return;
    }

    if (operation === 'divide' && second === 0) {
      setError('A number cannot be divided by zero. Try a different second number.');
      return;
    }

    const value = operations[operation].calculate(first, second);

    if (!Number.isFinite(value)) {
      setError('That calculation is outside the range of supported numbers.');
      return;
    }

    setResult({ first, second, operation, value });
  }

  const selectedOperation = operations[operation];

  return (
    <main className="page">
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Number Studio home">
          <span className="wordmark-icon" aria-hidden="true">∑</span>
          NUMBER STUDIO
        </a>
        <span className="challenge-tag">WEEK 08 <span aria-hidden="true">/</span> DAY 04</span>
      </header>

      <section className="calculator" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">DAILY CHALLENGE</p>
          <h1 id="page-title">Make numbers<br />make sense.</h1>
          <p className="description">
            A little math, made simple. Enter two numbers and choose what to do.
          </p>
        </div>

        <form className="calculator-form" onSubmit={calculate}>
          <div className="number-fields">
            <label className="field">
              <span className="field-label">FIRST NUMBER</span>
              <input
                autoComplete="off"
                inputMode="decimal"
                name="firstNumber"
                onChange={(event) => {
                  setFirstNumber(event.target.value);
                  clearOutput();
                }}
                placeholder="e.g. 12"
                type="number"
                value={firstNumber}
              />
            </label>

            <span className="field-operator" aria-hidden="true">{selectedOperation.symbol}</span>

            <label className="field">
              <span className="field-label">SECOND NUMBER</span>
              <input
                autoComplete="off"
                inputMode="decimal"
                name="secondNumber"
                onChange={(event) => {
                  setSecondNumber(event.target.value);
                  clearOutput();
                }}
                placeholder="e.g. 8"
                type="number"
                value={secondNumber}
              />
            </label>
          </div>

          <label className="field operation-field">
            <span className="field-label">OPERATION</span>
            <select
              name="operation"
              onChange={(event) => {
                setOperation(event.target.value);
                clearOutput();
              }}
              value={operation}
            >
              {Object.entries(operations).map(([value, item]) => (
                <option key={value} value={value}>
                  {item.label} ({item.symbol})
                </option>
              ))}
            </select>
          </label>

          <button className="calculate-button" type="submit">
            {operation === 'add' ? 'Add Them' : 'Calculate'}
            <span aria-hidden="true">↗</span>
          </button>
        </form>

        <div
          aria-atomic="true"
          aria-live="polite"
          className={`output${error ? ' output-error' : ''}`}
        >
          {error ? (
            <p className="message">{error}</p>
          ) : result ? (
            <div className="result" key={`${result.first}-${result.operation}-${result.second}`}>
              <p className="result-label">YOUR ANSWER</p>
              <p className="result-equation">
                {result.first} <span>{operations[result.operation].symbol}</span> {result.second}
                <span className="equals">=</span>
                <strong>{result.value}</strong>
              </p>
            </div>
          ) : (
            <p className="message">Your answer will appear here.</p>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <span>THOUGHTFUL INPUT. CLEAR OUTPUT.</span>
        <span>CALCULATE AT YOUR OWN PACE</span>
      </footer>
    </main>
  );
}

export default App;

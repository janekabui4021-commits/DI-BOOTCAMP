import { useState } from 'react';

type CounterAction = 'incremented' | 'decremented' | 'reset';

function Counter() {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<CounterAction | null>(null);

  function increment() {
    setCount((currentCount) => currentCount + 1);
    setLastAction('incremented');
  }

  function decrement() {
    setCount((currentCount) => currentCount - 1);
    setLastAction('decremented');
  }

  function reset() {
    setCount(0);
    setLastAction('reset');
  }

  return (
    <div className="counter">
      <div className="counter-readout" aria-live="polite" aria-atomic="true">
        <span className="counter-value">{count}</span>
        <span className="counter-action">
          {lastAction ? `Last action: ${lastAction}` : 'Ready when you are'}
        </span>
      </div>
      <div className="counter-controls" aria-label="Counter controls">
        <button className="button button-secondary" type="button" onClick={decrement}>
          − Decrease
        </button>
        <button className="button button-secondary" type="button" onClick={reset}>
          Reset
        </button>
        <button className="button button-primary" type="button" onClick={increment}>
          + Increase
        </button>
      </div>
    </div>
  );
}

export default Counter;

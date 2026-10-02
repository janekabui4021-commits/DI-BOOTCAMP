import { useState } from 'react';

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => {
    alert('I was clicked');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      alert(event.currentTarget.value);
    }
  };

  const toggleState = () => {
    setIsToggleOn((previousState) => !previousState);
  };

  return (
    <div className="exercise-content">
      <div className="control-row">
        <button type="button" onClick={clickMe}>Click me</button>
        <input
          type="text"
          aria-label="Type a message and press Enter"
          placeholder="Type something, then press Enter"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="control-row">
        <button type="button" onClick={toggleState}>
          {isToggleOn ? 'ON' : 'OFF'}
        </button>
        <span>The toggle is {isToggleOn ? 'ON' : 'OFF'}.</span>
      </div>
    </div>
  );
}

export default Events;
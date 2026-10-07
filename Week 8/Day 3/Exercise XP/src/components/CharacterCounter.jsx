import { useRef, useState } from 'react';

export default function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleChange = () => {
    const value = inputRef.current?.value ?? '';
    setCount(value.length);
  };

  return (
    <section className="card">
      <h2>Exercise 2: Character Counter</h2>
      <label htmlFor="message" className="label">Type something:</label>
      <input
        id="message"
        ref={inputRef}
        type="text"
        placeholder="Start typing here..."
        onChange={handleChange}
        className="text-input"
      />
      <p className="counter">Character count: <strong>{count}</strong></p>
    </section>
  );
}

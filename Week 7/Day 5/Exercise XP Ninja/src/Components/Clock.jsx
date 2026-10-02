import { useEffect, useState } from 'react';

function Clock() {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const tick = () => {
    setCurrentDate(new Date());
  };

  useEffect(() => {
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="clock-reading" aria-live="off">
      <time className="clock-time" dateTime={currentDate.toISOString()}>
        {currentDate.toLocaleTimeString()}
      </time>
      <span className="clock-date">
        {currentDate.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </div>
  );
}

export default Clock;
import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = this.getCurrentTime();
  }

  getCurrentTime = () => {
    const now = new Date();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return {
      year: now.getFullYear(),
      month: monthNames[now.getMonth()],
      dayOfWeek: dayNames[now.getDay()],
      dayOfMonth: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    };
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(this.getCurrentTime());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { year, month, dayOfWeek, dayOfMonth, hour, minute, second } = this.state;

    const secondRatio = second / 60;
    const minuteRatio = (minute + secondRatio) / 60;
    const hourRatio = (hour % 12 + minuteRatio) / 12;

    const secondDegrees = secondRatio * 360;
    const minuteDegrees = minuteRatio * 360;
    const hourDegrees = hourRatio * 360;

    const timeLabels = Array.from({ length: 12 }, (_, i) => {
      const value = i + 1;
      const angle = (i + 1) * 30;
      const radius = 124;
      const x = 150 + Math.cos(((angle - 90) * Math.PI) / 180) * radius;
      const y = 150 + Math.sin(((angle - 90) * Math.PI) / 180) * radius;

      return {
        value,
        x,
        y,
      };
    });

    return (
      <div className="clock-page">
        <div className="clock-wrapper">
          <div className="clock-frame">
            <div className="year-tag">{year}</div>
            <div className="month-tag">{month}</div>

            <div className="clock-face">
              {timeLabels.map(({ value, x, y }) => (
                <span
                  key={value}
                  className="clock-number"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  {value}
                </span>
              ))}

              <div className="center-dot" />
              <div
                className="hand hour-hand"
                style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
              />
              <div
                className="hand minute-hand"
                style={{ transform: `translateX(-50%) rotate(${minuteDegrees}deg)` }}
              />
              <div
                className="hand second-hand"
                style={{ transform: `translateX(-50%) rotate(${secondDegrees}deg)` }}
              />
            </div>
          </div>

          <div className="digital-panel">
            <h2>{dayOfWeek}</h2>
            <p>
              {month} {dayOfMonth}
            </p>
            <p>
              {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default function App() {
  return <Clock />;
}

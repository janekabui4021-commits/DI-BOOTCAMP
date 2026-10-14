import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayKey, setSelectedDate } from '../redux/plannerSlice.js';

function shiftDate(dateKey, amount) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day + amount);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

function formatDate(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day, 12));
}

export default function DatePicker() {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const dispatch = useDispatch();

  return (
    <section className="date-card" aria-label="Choose a planner day">
      <div className="date-summary">
        <span className="date-icon" aria-hidden="true">▦</span>
        <div>
          <p className="date-label">PLANNING FOR</p>
          <h2>{formatDate(selectedDate)}</h2>
        </div>
      </div>
      <div className="date-controls">
        <button
          className="icon-button"
          type="button"
          onClick={() => dispatch(setSelectedDate(shiftDate(selectedDate, -1)))}
          aria-label="Previous day"
        >
          ‹
        </button>
        <button
          className="today-button"
          type="button"
          onClick={() => dispatch(setSelectedDate(getTodayKey()))}
          aria-label="Go to today"
        >
          Today
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={() => dispatch(setSelectedDate(shiftDate(selectedDate, 1)))}
          aria-label="Next day"
        >
          ›
        </button>
        <label className="date-input-label">
          <span className="visually-hidden">Choose date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => dispatch(setSelectedDate(event.target.value))}
          />
        </label>
      </div>
    </section>
  );
}
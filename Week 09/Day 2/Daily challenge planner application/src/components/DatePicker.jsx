import React from 'react';
import { connect } from 'react-redux';
import { setSelectedDate } from '../redux/actions.js';
import { getTodayKey } from '../redux/reducer.js';

function shiftDate(dateKey, amount) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day + amount);
  const shiftedYear = date.getFullYear();
  const shiftedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const shiftedDay = String(date.getDate()).padStart(2, '0');
  return `${shiftedYear}-${shiftedMonth}-${shiftedDay}`;
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

function DatePicker({ selectedDate, setSelectedDate }) {
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
          onClick={() => setSelectedDate(shiftDate(selectedDate, -1))}
          aria-label="Previous day"
        >
          ‹
        </button>
        <button
          className="today-button"
          type="button"
          onClick={() => setSelectedDate(getTodayKey())}
        >
          Today
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={() => setSelectedDate(shiftDate(selectedDate, 1))}
          aria-label="Next day"
        >
          ›
        </button>
        <label className="date-input-label">
          <span className="visually-hidden">Choose date</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate,
});

export default connect(mapStateToProps, { setSelectedDate })(DatePicker);

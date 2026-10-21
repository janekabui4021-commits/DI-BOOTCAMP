import React, { Component } from 'react';
import './Exercise.css';

const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial',
};

export class Exercise extends Component {
  render() {
    return (
      <div className="exercise-content">
        <h1 style={style_header}>This is a heading</h1>
        <p className="para">This paragraph is styled with a separate CSS file.</p>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          Learn more about React
        </a>
        <form className="example-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="visitor-name">Your name</label>
          <input id="visitor-name" name="visitorName" type="text" placeholder="Type your name" />
          <button type="submit">Submit</button>
        </form>
        <img
          className="example-image"
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=85"
          alt="A small dog looking at the camera"
        />
        <ul className="example-list">
          <li>Paragraph</li>
          <li>Link</li>
          <li>Form</li>
        </ul>
      </div>
    );
  }
}
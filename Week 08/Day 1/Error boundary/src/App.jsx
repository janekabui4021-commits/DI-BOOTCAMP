import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const images = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=500&q=80',
];

function ColumnLeft() {
  const [imageList, setImageList] = useState([]);

  const getImages = () => {
    setImageList(images);
  };

  return (
    <div className="column">
      <h3>Left Column</h3>
      <button onClick={getImages}>Get images</button>
      <div className="image-grid">
        {imageList.map((src, index) => (
          <img key={index} src={src} alt="travel" className="image" />
        ))}
      </div>
    </div>
  );
}

function ColumnRight() {
  const [text, setText] = useState('{"function":"I live to crash"}');
  const [clicked, setClicked] = useState(false);

  const replaceStringWithObject = () => {
    setText({ function: 'I live to crash' });
  };

  const invokeEventHandler = () => {
    setClicked(true);
    console.log('Event handler invoked successfully');
  };

  return (
    <div className="column">
      <h3>Right Column</h3>
      <p>This is a normal text line.</p>

      <ErrorBoundary>
        <p>{text}</p>
      </ErrorBoundary>

      <button onClick={replaceStringWithObject}>Replace string with object</button>
      <button onClick={invokeEventHandler}>Invoke event handler</button>

      {clicked && <p className="success">Event handler was called successfully.</p>}
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>React Error Boundary</h1>
      </header>

      <div className="columns">
        <ColumnLeft />
        <ColumnRight />
      </div>
    </div>
  );
}

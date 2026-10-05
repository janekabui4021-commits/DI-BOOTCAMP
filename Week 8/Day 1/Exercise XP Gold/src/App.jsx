import React, { useState } from 'react';
import Modal from './Modal';
import ErrorBoundary from './ErrorBoundary';

function CrashComponent() {
  const [count, setCount] = useState(0);

  if (count >= 2) {
    throw new Error('I crashed!');
  }

  return (
    <button onClick={() => setCount(count + 1)}>
      Trigger crash inside boundary
    </button>
  );
}

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-container">
      <button className="open-modal-button" onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      {showModal && (
        <ErrorBoundary>
          <Modal
            message="There was an error while loading the modal."
            onClose={() => setShowModal(false)}
          />
        </ErrorBoundary>
      )}

      <div className="crash-demo">
        <ErrorBoundary>
          <CrashComponent />
        </ErrorBoundary>
      </div>
    </div>
  );
}

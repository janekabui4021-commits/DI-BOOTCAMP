import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="modal-background" onClick={this.props.onClose}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          <h3>Something went wrong</h3>
          <p>{this.props.message || 'An unexpected error occurred.'}</p>
          <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default Modal;

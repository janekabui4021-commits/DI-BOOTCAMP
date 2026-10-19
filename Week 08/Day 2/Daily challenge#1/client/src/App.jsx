import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloMessage: '',
      inputValue: '',
      responseMessage: '',
      errorMessage: '',
      isSubmitting: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      this.setState({ helloMessage: data.message });
    } catch (error) {
      this.setState({ errorMessage: `Could not contact the server: ${error.message}` });
    }
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      responseMessage: '',
      errorMessage: '',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true, responseMessage: '', errorMessage: '' });

    try {
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: this.state.inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      this.setState({ responseMessage: data.message });
    } catch (error) {
      this.setState({ errorMessage: `Could not send your message: ${error.message}` });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { helloMessage, inputValue, responseMessage, errorMessage, isSubmitting } = this.state;

    return (
      <main className="app">
        <section className="card">
          <p className="eyebrow">Week 8 · Day 2 · Daily Challenge #1</p>
          <h1>{helloMessage || 'Connecting to Express...'}</h1>
          <p className="intro">
            Send a message to the Express server and display its response here.
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="message">Message</label>
            <div className="form-row">
              <input
                id="message"
                type="text"
                value={inputValue}
                onChange={this.handleChange}
                placeholder="Type something to send"
                required
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send to server'}
              </button>
            </div>
          </form>

          {responseMessage && <p className="server-response" role="status">{responseMessage}</p>}
          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        </section>
      </main>
    );
  }
}

export default App;

import React, { Component } from 'react';

class FetchUserForm extends Component {
  state = {
    user: '',
    email: '',
    isSubmitting: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });

    try {
      const { user, email } = this.state;
      const response = await fetch('https://jsonplaceholder.typicode.com/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ user, email }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Fetch POST response:', result);
    } catch (error) {
      console.error('Unable to post user data:', error);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { user, email, isSubmitting } = this.state;

    return (
      <section className="form-card">
        <h2>POST with Fetch</h2>
        <p className="form-description">Send a user name and email to JSONPlaceholder.</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fetch-user">User</label>
          <input
            id="fetch-user"
            type="text"
            name="user"
            placeholder="Enter your user name"
            value={user}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="fetch-email">Email</label>
          <input
            id="fetch-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </section>
    );
  }
}

export default FetchUserForm;

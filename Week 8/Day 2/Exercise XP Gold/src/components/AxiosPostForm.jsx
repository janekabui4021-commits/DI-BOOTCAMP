import React, { Component } from 'react';
import axios from 'axios';

class AxiosPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      title: '',
      body: '',
      isSubmitting: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });

    try {
      const { userId, title, body } = this.state;
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        userId: Number(userId),
        title,
        body,
      });

      console.log('Axios POST response:', response.data);
    } catch (error) {
      console.error('Unable to post article data:', error);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { userId, title, body, isSubmitting } = this.state;

    return (
      <section className="form-card">
        <h2>POST with Axios</h2>
        <p className="form-description">Send a user ID, title, and body to JSONPlaceholder.</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="axios-user-id">User ID</label>
          <input
            id="axios-user-id"
            type="number"
            name="userId"
            placeholder="Enter a user ID"
            value={userId}
            onChange={this.handleChange}
            min="1"
            required
          />

          <label htmlFor="axios-title">Title</label>
          <input
            id="axios-title"
            type="text"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="axios-body">Body</label>
          <textarea
            id="axios-body"
            name="body"
            placeholder="Write your post"
            value={body}
            onChange={this.handleChange}
            rows="4"
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

export default AxiosPostForm;

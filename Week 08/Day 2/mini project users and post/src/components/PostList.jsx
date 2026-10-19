import React, { Component } from 'react';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((posts) => {
        this.setState({ posts, isLoading: false });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoading: false });
      });
  }

  render() {
    const { posts, errorMsg, isLoading } = this.state;

    return (
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-label">Latest data</p>
            <h2>Posts</h2>
          </div>
          {!isLoading && !errorMsg && (
            <span className="count-badge">{posts.length} posts</span>
          )}
        </div>

        {isLoading && <p className="status-message">Loading posts...</p>}
        {errorMsg && <p className="error-message">Could not load posts: {errorMsg}</p>}
        {!isLoading && !errorMsg && posts.length === 0 && (
          <p className="status-message">No posts were found.</p>
        )}
        {!isLoading && !errorMsg && posts.length > 0 && (
          <div className="post-list">
            {posts.map(({ id, title, body }) => (
              <article className="post-card" key={id}>
                <span className="item-number">POST {String(id).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default PostList;

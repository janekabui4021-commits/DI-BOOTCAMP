import React, { Component } from 'react';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errorMsg: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((users) => {
        this.setState({ users, isLoading: false });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoading: false });
      });
  }

  render() {
    const { users, errorMsg, isLoading } = this.state;

    return (
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-label">Exercise 1</p>
            <h2>Express Users</h2>
          </div>
          {!isLoading && !errorMsg && (
            <span className="count-badge">{users.length} users</span>
          )}
        </div>

        {isLoading && <p className="status-message">Loading users...</p>}
        {errorMsg && <p className="error-message">Could not load users: {errorMsg}</p>}
        {!isLoading && !errorMsg && users.length === 0 && (
          <p className="status-message">No users were found.</p>
        )}
        {!isLoading && !errorMsg && users.length > 0 && (
          <ul className="user-list">
            {users.map(({ id, username }) => (
              <li className="user-card" key={id}>
                <span className="avatar" aria-hidden="true">
                  {username.charAt(0).toUpperCase()}
                </span>
                <div className="user-details">
                  <span className="item-number">USER {String(id).padStart(2, '0')}</span>
                  <h3>{username}</h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default UsersList;

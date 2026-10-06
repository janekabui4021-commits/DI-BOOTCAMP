import React, { Component } from 'react';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((users) => {
        this.setState({ users, isLoaded: true });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoaded: true });
      });
  }

  render() {
    const { users, isLoaded, errorMsg } = this.state;

    return (
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-label">Community</p>
            <h2>Users</h2>
          </div>
          {isLoaded && !errorMsg && (
            <span className="count-badge">{users.length} users</span>
          )}
        </div>

        {!isLoaded && <p className="status-message">Loading users...</p>}
        {isLoaded && errorMsg && (
          <p className="error-message">Could not load users: {errorMsg}</p>
        )}
        {isLoaded && !errorMsg && users.length === 0 && (
          <p className="status-message">No users were found.</p>
        )}
        {isLoaded && !errorMsg && users.length > 0 && (
          <ul className="user-list">
            {users.map(({ id, name, email }) => (
              <li className="user-card" key={id}>
                <span className="avatar" aria-hidden="true">
                  {name.charAt(0)}
                </span>
                <div className="user-details">
                  <h3>{name}</h3>
                  <a href={`mailto:${email}`}>{email}</a>
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

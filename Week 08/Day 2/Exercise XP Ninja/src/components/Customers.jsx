import React, { Component } from 'react';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      isLoaded: false,
      errorMsg: '',
    };
  }

  componentDidMount() {
    fetch('/api/customers/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((customers) => {
        this.setState({ customers, isLoaded: true });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message, isLoaded: true });
      });
  }

  render() {
    const { customers, isLoaded, errorMsg } = this.state;

    return (
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-label">Exercise 2</p>
            <h2>Customers</h2>
          </div>
          {isLoaded && !errorMsg && (
            <span className="count-badge">{customers.length} customers</span>
          )}
        </div>

        {!isLoaded && <p className="status-message">Loading customers...</p>}
        {isLoaded && errorMsg && (
          <p className="error-message">Could not load customers: {errorMsg}</p>
        )}
        {isLoaded && !errorMsg && customers.length === 0 && (
          <p className="status-message">No customers were found.</p>
        )}
        {isLoaded && !errorMsg && customers.length > 0 && (
          <ul className="user-list">
            {customers.map(({ id, firstName, lastName }) => (
              <li className="user-card" key={id}>
                <span className="avatar" aria-hidden="true">
                  {firstName.charAt(0)}
                </span>
                <div className="user-details">
                  <span className="item-number">CUSTOMER {String(id).padStart(2, '0')}</span>
                  <h3>{firstName} {lastName}</h3>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default Customers;

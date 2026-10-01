import React, { Component } from 'react';

class UserFavoriteAnimals extends Component {
  render() {
    return (
      <ul>
        {this.props.favAnimals.map((animal) => (
          <li key={animal}>{animal}</li>
        ))}
      </ul>
    );
  }
}

export default UserFavoriteAnimals;
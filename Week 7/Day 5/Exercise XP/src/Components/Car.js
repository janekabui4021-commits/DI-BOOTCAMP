import { useState } from 'react';
import Garage from './Garage.js';

function Car({ carInfo }) {
  const [color] = useState('red');

  return (
    <div className="exercise-content">
      <p>This car is a {color} {carInfo.model}.</p>
      <Garage size="small" />
    </div>
  );
}

export default Car;
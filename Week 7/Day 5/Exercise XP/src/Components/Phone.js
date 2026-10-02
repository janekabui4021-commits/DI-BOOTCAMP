import { useState } from 'react';

function Phone() {
  const [brand] = useState('Samsung');
  const [model] = useState('Galaxy S20');
  const [color, setColor] = useState('black');
  const [year] = useState(2020);

  const changeColor = () => {
    setColor('blue');
  };

  return (
    <div className="exercise-content">
      <p>This is a {color} {brand} {model} from {year}.</p>
      <div>
        <button type="button" onClick={changeColor}>Change color</button>
      </div>
    </div>
  );
}

export default Phone;
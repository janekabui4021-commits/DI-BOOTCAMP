import { useEffect, useState } from 'react';

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red');

  useEffect(() => {
    alert('useEffect reached');
  }, []);

  const changeColor = () => {
    setFavoriteColor('blue');
  };

  return (
    <div className="exercise-content">
      <h3>My favorite color is {favoriteColor}.</h3>
      <div>
        <button type="button" onClick={changeColor}>Change color</button>
      </div>
    </div>
  );
}

export default Color;
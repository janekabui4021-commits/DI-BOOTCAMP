import { useDispatch, useSelector } from 'react-redux';
import { ageDownAsync, ageUpAsync } from '../features/age/ageSlice.js';

function AgeControls() {
  const dispatch = useDispatch();
  const { age, loading } = useSelector((state) => state.age);

  const handleSubmit = (event) => {
    event.preventDefault();
    const direction = event.nativeEvent.submitter?.value;

    if (direction === 'up') {
      dispatch(ageUpAsync());
    } else if (direction === 'down' && age > 0) {
      dispatch(ageDownAsync());
    }
  };

  return (
    <form className="age-controls" onSubmit={handleSubmit}>
      <button className="control-button control-down" type="submit" name="direction" value="down" disabled={loading || age === 0}>
        <span className="button-symbol" aria-hidden="true">−</span>
        <span>Age down</span>
      </button>
      <button className="control-button control-up" type="submit" name="direction" value="up" disabled={loading}>
        <span className="button-symbol" aria-hidden="true">+</span>
        <span>Age up</span>
      </button>
    </form>
  );
}

export default AgeControls;

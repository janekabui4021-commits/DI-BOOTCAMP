import { useState } from 'react';

function Forms() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(null);
  const [errormessage, setErrormessage] = useState('');
  const [message, setMessage] = useState('React forms keep input values in state.');
  const [selectedCar, setSelectedCar] = useState('Volvo');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
      return;
    }

    if (name === 'age') {
      setAge(value === '' ? null : value);
      setErrormessage(
        value.trim() !== '' && Number.isNaN(Number(value))
          ? 'Age must be a number.'
          : '',
      );
    }
  };

  const mySubmitHandler = (event) => {
    event.preventDefault();
    alert(username);
  };

  const header = username.trim() ? (
    <h3 className="form-greeting">
      Hello {username.trim()}{age !== null && !errormessage ? `, age ${age}` : ''}!
    </h3>
  ) : null;

  return (
    <div className="exercise-content">
      {header}

      <form className="form-fields" onSubmit={mySubmitHandler}>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={handleInputChange}
          autoComplete="name"
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="text"
          inputMode="numeric"
          value={age ?? ''}
          onChange={handleInputChange}
          aria-invalid={Boolean(errormessage)}
          aria-describedby={errormessage ? 'age-error' : undefined}
        />
        {errormessage && <p className="form-error" id="age-error" role="alert">{errormessage}</p>}

        <button type="submit">Submit</button>
      </form>

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="3"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <label htmlFor="car">Favorite car</label>
      <select
        id="car"
        name="car"
        value={selectedCar}
        onChange={(event) => setSelectedCar(event.target.value)}
      >
        <option value="Volvo">Volvo</option>
        <option value="Saab">Saab</option>
        <option value="Mercedes">Mercedes</option>
        <option value="Audi">Audi</option>
      </select>
      <p>Selected car: {selectedCar}</p>
    </div>
  );
}

export default Forms;
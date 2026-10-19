import React, { useState } from 'react';

function FormComponent({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2>React Form Container</h2>

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>

      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </label>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>

      <label>
        Destination:
        <select name="destination" value={formData.destination} onChange={handleChange}>
          <option value="">Select destination</option>
          <option value="Japan">Japan</option>
          <option value="France">France</option>
          <option value="Canada">Canada</option>
          <option value="Brazil">Brazil</option>
        </select>
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="lactoseFree"
          checked={formData.lactoseFree}
          onChange={handleChange}
        />
        Lactose Free
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default function App() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    age: '25',
    gender: 'male',
    destination: 'Japan',
    lactoseFree: true,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      gender: formData.gender,
      destination: formData.destination,
      lactoseFree: formData.lactoseFree ? 'on' : 'off',
    });

    const queryString = params.toString();
    window.history.pushState({}, '', `?${queryString}`);
    console.log('URL updated to:', `http://localhost:3000/?${queryString}`);
  };

  return (
    <div className="app">
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

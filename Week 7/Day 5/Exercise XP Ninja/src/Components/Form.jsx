import { useState } from 'react';
import Input from './Input.jsx';

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

const fieldDefinitions = {
  firstName: { label: 'First name', autoComplete: 'given-name' },
  lastName: { label: 'Last name', autoComplete: 'family-name' },
  phone: { label: 'Phone', autoComplete: 'tel' },
  email: { label: 'Email', autoComplete: 'email' },
};

function validateField(name, value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'This field is required.';
  }

  if ((name === 'firstName' || name === 'lastName') && !/^[\p{L}][\p{L} '\u2019-]*$/u.test(trimmedValue)) {
    return 'Use letters, spaces, apostrophes, or hyphens.';
  }

  if (name === 'phone' && !/^\+?(?:[\s().-]*\d){7,15}[\s().-]*$/.test(trimmedValue)) {
    return 'Enter a valid phone number with 7 to 15 digits.';
  }

  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)) {
    return 'Enter a valid email address.';
  }

  return '';
}

function Form() {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setSubmitted(false);

    if (Object.hasOwn(errors, name)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = Object.fromEntries(
      Object.entries(values).map(([name, value]) => [name, validateField(name, value)]),
    );
    setErrors(nextErrors);
    setSubmitted(Object.values(nextErrors).every((error) => !error));
  };

  return (
    <form className="validation-form" onSubmit={handleSubmit} noValidate>
      {Object.entries(fieldDefinitions).map(([name, definition]) => (
        <Input
          key={name}
          id={name}
          label={definition.label}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors[name]}
          autoComplete={definition.autoComplete}
        />
      ))}

      <button type="submit">Submit details</button>
      {submitted && <p className="success-message" role="status">All details are valid. Form submitted.</p>}
    </form>
  );
}

export default Form;
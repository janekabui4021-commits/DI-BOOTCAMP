function Input({ id, label, value, onChange, onBlur, error, autoComplete }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default Input;
export const Input = ({ id, type, name, placeholder, value, onChange, className }) => (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${className}`}
    />
  );
  
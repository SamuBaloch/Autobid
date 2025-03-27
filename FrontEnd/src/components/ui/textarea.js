export const Textarea = ({ id, name, placeholder, value, onChange, className, rows }) => (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded ${className}`}
      rows={rows}
    />
  );
  
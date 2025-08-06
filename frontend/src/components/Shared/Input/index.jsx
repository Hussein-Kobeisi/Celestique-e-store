import "./index.css";

const Input = ({ type="text",label,labelname,name, hint, required, onChangeListener }) => {
  return (
   <div className="auth-input-field">
    <label htmlFor={label}>{labelname}</label>
    <input
      type={type}
      name={name}
      placeholder={hint}
      className="auth-input-field"
      required={required}
      onChange={onChangeListener}
    />
    </div>
  );
};

export default Input;

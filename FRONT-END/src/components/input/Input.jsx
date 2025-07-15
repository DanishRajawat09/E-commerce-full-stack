import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./input.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Input = ({
  htmlFor,
  label,
  type = "text",
  id,
  name,
  className,
  password,
  placeHolder,
  ...props
}) => {
  const [eye, setEye] = useState(false);
  return (
    <>
      {label && (
        <label htmlFor={htmlFor} className="formLabel">
          {label}
        </label>
      )}
      {password ? (
        <div className="Field" id="passwordInput">
          <input
            type={eye ? "text" : "password"}
            className="inputField"
            id={htmlFor}
            name={name}
            placeholder={placeHolder}
          />
          <div className="eye" onClick={() => setEye((prev) => !prev)}>
            {eye &&  <FontAwesomeIcon icon={faEyeSlash} />}
            {!eye && <FontAwesomeIcon icon={faEye}  />}
          </div>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={htmlFor}
          className={className}
          placeholder={placeHolder}
          {...props}
        />
      )}
    </>
  );
};

export default Input;

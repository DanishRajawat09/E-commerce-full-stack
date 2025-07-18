import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, forwardRef } from "react";
import "./input.css";

const Input = forwardRef(
  ({ label, name, type = "text", id, password, placeholder, required = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        {label && (
          <label htmlFor={id || name} className="inputLabel">
            {label}
          </label>
        )}

        {password ? (
          <div className="Field" id="passwordInput">
            <input
              ref={ref}
              type={showPassword ? "text" : "password"}
              className="inputField"
              id={id || name}
              name={name}
              placeholder={placeholder}
              required={required}
              {...props}
            />
            <div className="eye" onClick={() => setShowPassword((prev) => !prev)}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </div>
          </div>
        ) : (
          <input
            ref={ref}
            type={type}
            id={id || name}
            name={name}
            className="inputField"
            placeholder={placeholder}
            required={required}
            {...props}
          />
        )}
      </>
    );
  }
);

Input.displayName = "Input";
export default Input;

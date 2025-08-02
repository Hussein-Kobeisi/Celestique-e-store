import { Link } from "react-router-dom"; 
import Input from "../Shared/Input";
import { useRegisterFormLogic } from './logic';
import gold from "../../assets/Goldenrings.png"; 

const RegisterForm = ({ toggle }) => {
  const {
    email, setEmail,
    password, setPassword,
    username, setUsername,
    phoneNumber, setPhoneNumber,
    errorMessage,
    handleSubmit,
  } = useRegisterFormLogic();

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="image-section">
          <img 
            src={gold} 
            alt="Luxury jewelry collection" 
            className="auth-image"
          />
        </div>
        
        <div className="form-section">
          <div className="form-wrapper">
            <div className="form-header">
              <h1>Create an account</h1>
              <p>Sign up to start browsing our luxury catalog</p>
            </div>

            <div className="form-fields">
              <Input
                name="username"
                labelname="Username"
                hint="Name"
                onChangeListener={(e) => setUsername(e.target.value)}
                required={true}
                value={username} 
              />

              <Input
                name="email"
                labelname="Email Address"
                hint="Email"
                onChangeListener={(e) => setEmail(e.target.value)}
                required={true}
                value={email} 
              />

              <Input
                name="password"
                labelname="Password"
                hint="Password"
                onChangeListener={(e) => setPassword(e.target.value)}
                required={true}
                type="password" 
                value={password} 
              />

              <Input
                name="phone"
                labelname="Phone Number"
                hint="Phone Number"
                onChangeListener={(e) => setPhoneNumber(e.target.value)}
                required={false}
                value={phoneNumber} 
              />

              <button className="submit-button" onClick={handleSubmit}>
                Sign Up
              </button>

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              <div className="auth-prompt">
                Already have an account? <Link onClick={toggle} className="auth-link">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
import { Link } from "react-router-dom"; 
import Input from "../Shared/Input";
import { useLoginFormLogic } from './logic';
import gold from "../../assets/Goldenrings.png"; 
const LoginForm = ({ toggle }) => {
  const {
    email, setEmail,
    password, setPassword,
    errorMessage,
    handleSubmit,
  } = useLoginFormLogic();

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
              <h1>Welcome back</h1>
              <p>Sign in to access your luxury catalog</p>
            </div>

            <div className="form-fields">
              <Input
                name="email"
                labelname="Email Address"
                hint="Email"
                onChangeListener={(e) => setEmail(e.target.value)}
                required={true}
                type="email"
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

              <button className="submit-button" onClick={handleSubmit}>
                Sign In
              </button>

              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              <div className="auth-prompt">
                Don't have an account? <Link onClick={toggle} className="auth-link">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
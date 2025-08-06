import "./index.css";
import Navbar from "../../components/Shared/Usernavbar";
import { useProfileLogic } from './logic';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const {
    formData,
    isLoading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    handleDeleteAccount,
  } = useProfileLogic();


  const getUserInitials = (username) => {
    if (!username) return "U";
    const names = username.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return username[0].toUpperCase();
  };

  return (
    <div>
      <Navbar activeLink="Profile" />
      <main className="pf-main-content">
        <aside className="pf-profile-sidebar">
          <div className="pf-profile-header">
            <div className="pf-profile-avatar">
              {getUserInitials(formData.username)}
            </div>
            <div className="pf-profile-name">{formData.username || "User"}</div>
            <div className="pf-profile-subtitle">
              User Since<br />
              {formData.memberSince}
            </div>
          </div>
          
          <div className="pf-profile-stats">
            <div className="pf-stat-item">
              <span className="pf-stat-number">127</span>
              <span className="pf-stat-label">Purchases</span>
            </div>
            <div className="pf-stat-item">
              <span className="pf-stat-number">$12,350</span>
              <span className="pf-stat-label">Spent</span>
            </div>
          </div>
        </aside>

        <div className="pf-profile-content">
          <div className="pf-content-card">
            <div className="pf-card-header">
              <h2 className="pf-card-title">Edit Information</h2>
            </div>
            <div className="pf-card-content">
              {successMessage && (
                <div className="pf-success-message">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="pf-error-message">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="pf-form-row">
                  <div className="pf-form-group">
                    <input
                      type="text"
                      className="pf-form-input"
                      name="username"
                      placeholder="Name"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pf-form-group">
                    <input
                      type="text"
                      className="pf-form-input"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pf-form-row">
                  <div className="pf-form-group">
                    <input
                      type="email"
                      className="pf-form-input"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pf-form-group">
                    <input
                      type="password"
                      className="pf-form-input"
                      name="password"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="pf-form-actions">
                  <button type="button" className="pf-btn pf-btn-cancel" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button type="submit" className="pf-btn pf-btn-save" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
                <button 
                  type="button" 
                  className="pf-btn-danger"
                  onClick={handleDeleteAccount}
                >
                  Delete Account Permanently
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
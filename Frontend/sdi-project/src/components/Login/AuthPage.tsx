import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { login } from "../../services/AuthService";

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login(email, password);
    setTimeout(() => {
      setLoading(false);
      navigate("/tickets");
    }, 2000);
  };

  return (
    <div className="login-container">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="login-form-container">
          <h2 className="login-heading">Login</h2>
          <form className="login-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AuthPage;

import { useContext, useState } from 'react';
import axios from 'axios';
import './Login.scss';
import { useNavigate } from 'react-router';
import { myContext } from '../components/ContextProvider';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(myContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('handle login');
    setError('');
    setLoading(true);

    try {
      console.log('payload', { username, password });
      const response = await axios.post(
        ' http://localhost:4321/v1/local',
        { username, password },
        { withCredentials: true }
      );
      // console.log('res', response);
      // console.log('Response: 1', response.data.user);
      if (response.data.status === 'success') {
        alert('Login successful!');
        // console.log('user', response.data.user);
        // Optionally redirect the user after login
        // window.location.href = '/dashboard';
        setUser(response.data.user);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert('Logged in with Google!');
  };

  const handleFacebookLogin = () => {
    alert('Logged in with Facebook!');
  };

  return (
    <div className="login-container">
      <h1 className="title">Welcome Back</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="divider">OR</div>

      <div className="social-buttons">
        <button className="google-button" onClick={handleGoogleLogin}>
          <i className="icon-google"></i> Log in with Google
        </button>
        <button className="facebook-button" onClick={handleFacebookLogin}>
          <i className="icon-facebook"></i> Log in with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

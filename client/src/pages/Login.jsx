import { useContext, useState } from 'react';
import axios from './../Utils/axios';
import './Login.scss';
import { useNavigate } from 'react-router';
import { globalContext } from '../components/ContextProvider';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(globalContext);

  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    if (!loginData.username.trim())
      validationErrors.username = 'Username is required';

    //  if (!/^\S+@\S+\.\S+$/.test(loginData.email))
    //    validationErrors.email = 'Please enter a valid email address';

    if (loginData.password.length < 8)
      validationErrors.password = 'Password must be at least 8 characters long';

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  // FIX
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('handle login');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      setLoading(true);

      try {
        const response = await axios.post('login', {
          username: loginData.username,
          password: loginData.password,
        });
        console.log('res', response);
        // console.log('Response: 1', response.data.user);
        if (response.data.status === 'success') {
          // alert('Login successful!');
          console.log('user', response.data);
          // Optionally redirect the user after login
          // window.location.href = '/dashboard';
          setError({});
          // FIX TO INCLUDE TOKEN ALSO
          setUser(response.data);
          navigate('/dashboard/members');
        } else {
          setError({
            other: response.data.message || 'Login failed. Please try again.',
          });
        }
      } catch (err) {
        // console.error('Error:', err);
        console.error('Error:', err.response?.data || err.message);
        setError({
          other:
            err.response?.data?.message ||
            'An error occurred. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    // alert('Logged in with Google!');
  };

  const handleFacebookLogin = () => {
    // alert('Logged in with Facebook!');
  };

  return (
    <div className="login-container">
      <h1 className="title">Welcome Back</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            name="username"
            placeholder="Enter your username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
          {error.username && (
            <small className="error-message">{error.username}</small>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          {error.password && (
            <small className="error-message">{error.password}</small>
          )}
        </div>
        {error.other && <div className="error-message">{error.other}</div>}
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

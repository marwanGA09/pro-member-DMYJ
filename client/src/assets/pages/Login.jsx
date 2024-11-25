import React, { useState } from 'react';
import './Login.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
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
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="login-button">
          Log In
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

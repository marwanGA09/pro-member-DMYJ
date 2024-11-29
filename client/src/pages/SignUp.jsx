import { useState } from 'react';
import axios from 'axios';
import './SignUp.scss';
import { useNavigate } from 'react-router';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    sector: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const sectors = ['economy', 'academy', 'social', "daw'a"];

  const validate = () => {
    const validationErrors = {};
    if (!formData.first_name.trim())
      validationErrors.first_name = 'First name is required';
    if (!formData.middle_name.trim())
      validationErrors.middle_name = 'Middle name is required';
    if (!formData.last_name.trim())
      validationErrors.last_name = 'Last name is required';
    if (!formData.username.trim())
      validationErrors.username = 'Username is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      validationErrors.email = 'Please enter a valid email address';
    if (!/^\+?\d{10,15}$/.test(formData.phone))
      validationErrors.phone = 'Enter a valid phone number (10-15 digits)';
    if (!sectors.includes(formData.sector))
      validationErrors.sector = 'Please select a valid sector';
    if (formData.password.length < 8)
      validationErrors.password = 'Password must be at least 8 characters long';
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = 'Passwords do not match';
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // console.log('Submitting form...');

      const payload = {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        sector: formData.sector,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phonenumber: formData.phone,
      };

      // console.log('Payload:', payload);

      axios
        .post('http://localhost:4321/v1/signup', payload, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('Signup successful!');
          setErrors({});
          navigate('/login');
        })
        .catch((err) => {
          // console.log('xxxxxxxxx:', err.response?.data?.errors);
          // console.log('Error response.data:', err.response?.data);
          // console.log('Error || err.message', err.message);

          if (err.response?.data?.error?.constraint === 'users_username_key') {
            setErrors({ username: 'Username already exists' });
          } else if (
            err.response?.data?.error?.constraint === 'users_email_key'
          ) {
            setErrors({ email: 'Email already exists' });
          } else {
            setErrors({ something: 'Something went wrong' });
          }

          if (err.response && err.response.data) {
            console.log(`Signup failed: ${err.response.data.message}`);
          }
        });
    }
  };

  return (
    <div className="signup-container">
      <h1 className="title" onClick={handleSubmit}>
        Signup
      </h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <small className="error">{errors.first_name}</small>
          )}
        </div>

        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
          {errors.middle_name && (
            <small className="error">{errors.middle_name}</small>
          )}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <small className="error">{errors.last_name}</small>
          )}
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <small className="error">{errors.username}</small>
          )}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="form-group">
          <label>Sector</label>
          <select name="sector" value={formData.sector} onChange={handleChange}>
            <option value="">Select a sector</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          {errors.sector && <small className="error">{errors.sector}</small>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="error">{errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit" className="signup-button">
          Signup
        </button>
        <div className="form-group">
          {errors.something && (
            <small className="error">{errors.something}</small>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupPage;

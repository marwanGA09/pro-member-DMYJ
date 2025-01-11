import { useState } from 'react';
import axios from './../Utils/axios';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    sector: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const sectors = [
    'economy',
    'academy',
    'social',
    'dawah',
    'management',
    'other',
  ];

  const validate = () => {
    const validationErrors = {};
    if (!formData.firstName.trim())
      validationErrors.firstName = 'First name is required';
    if (!formData.middleName.trim())
      validationErrors.middleName = 'Middle name is required';
    if (!formData.lastName.trim())
      validationErrors.lastName = 'Last name is required';
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
    if (errors[name]) {
      validate();
    }
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
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        sector: formData.sector,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phone,
      };

      // console.log('Payload:', payload);

      axios
        .post('signup', payload, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('Signup successful!');
          setErrors({});
          navigate('/login');
        })
        .catch((err) => {
          console.log('xxxxxxxxx:', err.response?.data);
          // console.log('Error response.data:', err.response?.data);
          // console.log('Error || err.message', err.message);

          if (err.response?.data?.error?.constraint === 'username') {
            setErrors({ username: 'Username already exists' });
          } else if (err.response?.data?.error?.constraint === 'email') {
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <small className="error">{errors.firstName}</small>
          )}
        </div>

        <div className="form-group">
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />
          {errors.middleName && (
            <small className="error">{errors.middleName}</small>
          )}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <small className="error">{errors.lastName}</small>
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

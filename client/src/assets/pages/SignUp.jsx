import { useState } from 'react';
import './SignUp.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    sector: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const sectors = ['management', 'economy', 'academy', 'social', "daw'a"];

  const validate = () => {
    const validationErrors = {};
    if (!formData.first_name.trim())
      validationErrors.first_name = 'First name is required';
    if (!formData.middle_name.trim())
      validationErrors.middle_name = 'Middle name is required';
    if (!formData.last_name.trim())
      validationErrors.last_name = 'Last name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      validationErrors.email = 'Please enter a valid email address';
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
      setErrors({});
      alert('Signup successful');
      console.log(formData);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="title">Signup</h1>
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
      </form>
    </div>
  );
};

export default SignUp;

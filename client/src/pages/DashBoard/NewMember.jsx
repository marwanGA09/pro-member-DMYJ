import { useState } from 'react';
import styles from './NewMember.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewMember() {
  const [formData, setFormData] = useState({
    fullName: '',
    sex: '',
    bookNumber: '',
    profession: '',
    phone: '',
    address: '',
    email: '',
    dateOfBirth: new Date(), // Default to current date
    membershipAmount: '',
    profileImage: null,
    signedDate: new Date(), // Default to current date
    note: '',
    createdBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file), // Preview the uploaded image
      }));
    }
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>New Member Registration</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Sex
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label className={styles.label}>
          Book Number
          <input
            type="text"
            name="bookNumber"
            value={formData.bookNumber}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Profession
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Phone
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Address
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Date of Birth
          <DatePicker
            selected={formData.dateOfBirth}
            onChange={(date) => handleDateChange(date, 'dateOfBirth')}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Membership Amount
          <input
            type="number"
            name="membershipAmount"
            value={formData.membershipAmount}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.input}
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile Preview"
              className={styles.imagePreview}
            />
          )}
        </label>

        <label className={styles.label}>
          Signed Date
          <DatePicker
            selected={formData.signedDate}
            onChange={(date) => handleDateChange(date, 'signedDate')}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Note
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className={styles.textarea}
          />
        </label>

        <label className={styles.label}>
          Created By
          <input
            type="number"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewMember;

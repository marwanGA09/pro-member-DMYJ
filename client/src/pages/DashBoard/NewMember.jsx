import { useContext, useState } from 'react';
import styles from './NewMember.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { globalContext } from '../../components/ContextProvider';
import axios from './../../Utils/axios';
import { useNavigate } from 'react-router-dom';

function NewMember() {
  const { user } = useContext(globalContext);

  console.log(user.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    sex: 'male',
    bookNumber: '',
    profession: '',
    phone: '',
    address: '',
    email: null,
    dateOfBirth: new Date(), // Default to current date
    membershipAmount: '',
    profileImage: null,
    signedDate: new Date(), // Default to current date
    note: '',
  });

  const [errors, setErrors] = useState({});

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    // Validate fullName
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length > 150) {
      newErrors.fullName = 'Full name must not exceed 150 characters';
    }

    // Validate sex
    if (formData.sex && !['male', 'female'].includes(formData.sex)) {
      newErrors.sex = 'Sex must be one of: Male, Female ';
    }

    // Validate bookNumber
    if (!formData.bookNumber) {
      newErrors.bookNumber = 'Book number is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.bookNumber)) {
      newErrors.bookNumber =
        'Book number must contain only letters and numbers';
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (
      !/^(\+?[0-9]{1,3})?(\([0-9]{1,3}\))?([0-9]{7,15})$/.test(formData.phone)
    ) {
      newErrors.phone = 'Phone number must be valid';
    }

    // Validate address
    if (!formData.address) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length > 250) {
      newErrors.address = 'Address must not exceed 250 characters';
    }

    // Validate email
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email must be valid';
    }

    // Validate membershipAmount
    if (!formData.membershipAmount) {
      newErrors.membershipAmount = 'Membership amount is required';
    } else if (parseInt(formData.membershipAmount, 10) < 10) {
      newErrors.membershipAmount = 'Membership amount must be greater than 10';
    }

    // Validate note
    if (formData.note && formData.note.length > 500) {
      newErrors.note = 'Note must not exceed 500 characters';
    }

    setErrors(newErrors);

    // If there are any errors, return false, otherwise return true
    // return Object.keys(newErrors).length ;
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      validateForm();
    }
    // const x = validateForm()[1][name];
    // console.log('xx', x);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('files', file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file, // Preview the uploaded image
        // profileImage: URL.createObjectURL(file), // Preview the uploaded image
      }));
    }
  };

  const handleDateChange = (date, field) => {
    if (errors[field]) {
      validateForm();
    }
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     console.log('submitiing member');
  //     const payload = {
  //       fullName: formData.fullName,
  //       sex: formData.sex,
  //       bookNumber: formData.bookNumber,
  //       profession: formData.profession,
  //       phone: formData.phone,
  //       address: formData.address,

  //       dateOfBirth: formData.dateOfBirth,
  //       membershipAmount: parseInt(formData.membershipAmount),
  //       profileImage: formData.profileImage,
  //       signedDate: formData.signedDate,
  //       note: formData.note,
  //       createdBy: parseInt(user.user.id), // Assuming user is logged in
  //     };

  //     if (formData.email) {
  //       payload.email = formData.email;
  //     }
  //     console.log('payload', payload);

  //     axios
  //       .post('http://localhost:4321/v1/members', payload, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         console.log('member successful registered!');
  //         setErrors({});
  //         navigate('../members');
  //       })
  //       .catch((err) => {
  //         // console.log(JSON.stringify(err, null, 2));
  //         console.log('xxxxxxxxx:', err.response?.data);

  //         if (err.response?.data?.error?.constraint === 'phone') {
  //           setErrors({ phone: 'phone already used for other members' });
  //         } else if (err.response?.data?.error?.constraint === 'book_number') {
  //           setErrors({ bookNumber: 'book number is used by other member' });
  //         } else if (err.response?.data?.error?.constraint === 'email') {
  //           setErrors({ email: 'Email already exists' });
  //         } else {
  //           setErrors({ something: 'Something went wrong' });
  //         }

  //         if (err.response && err.response.data) {
  //           console.log(`member creation field: ${err.response.data.message}`);
  //         }
  //       });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Submitting member');

      // Create FormData instance
      const formDataPayload = new FormData();
      formDataPayload.append('fullName', formData.fullName);
      formDataPayload.append('sex', formData.sex);
      formDataPayload.append('bookNumber', formData.bookNumber);
      formDataPayload.append('profession', formData.profession);
      formDataPayload.append('phone', formData.phone);
      formDataPayload.append('address', formData.address);
      formDataPayload.append('dateOfBirth', formData.dateOfBirth.toISOString());
      formDataPayload.append(
        'membershipAmount',
        parseInt(formData.membershipAmount)
      );
      formDataPayload.append('signedDate', formData.signedDate.toISOString());
      formDataPayload.append('note', formData.note);
      formDataPayload.append('createdBy', parseInt(user.user.id));

      if (formData.email) {
        formDataPayload.append('email', formData.email);
      }

      if (formData.profileImage) {
        formDataPayload.append('profileImage', formData.profileImage);
      }

      console.log('Payload:', Array.from(formDataPayload.entries()));

      axios
        .post('members', formDataPayload, {
          withCredentials: true,
          headers: {
            // Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('Member successfully registered!');
          setErrors({});
          navigate('../members');
        })
        .catch((err) => {
          console.log('Error with in catch:', err.response?.data);

          if (err.response?.data?.error?.constraint === 'phone') {
            setErrors({ phone: 'Phone already used for other members' });
          } else if (err.response?.data?.error?.constraint === 'book_number') {
            setErrors({ bookNumber: 'Book number is used by another member' });
          } else if (err.response?.data?.error?.constraint === 'email') {
            setErrors({ email: 'Email already exists' });
          } else {
            setErrors({ something: 'Something went wrong' });
          }

          if (err.response && err.response.data) {
            console.log(`Member creation failed: ${err.response.data.message}`);
          }
        });
    }
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
          {errors.fullName && (
            <span className={styles.error}>{errors.fullName}</span>
          )}
        </label>

        <label className={styles.label}>
          Sex
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="radio"
                name="sex"
                value="male"
                checked={formData.sex === 'male'}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="sex"
                value="female"
                checked={formData.sex === 'female'}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Female
            </label>
          </div>
          {errors.sex && <span className={styles.error}>{errors.sex}</span>}
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
          {errors.bookNumber && (
            <span className={styles.error}>{errors.bookNumber}</span>
          )}
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
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
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
          {errors.address && (
            <span className={styles.error}>{errors.address}</span>
          )}
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
          {errors.email && <span className={styles.error}>{errors.email}</span>}
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
          {errors.membershipAmount && (
            <span className={styles.error}>{errors.membershipAmount}</span>
          )}
        </label>

        <label className={styles.label}>
          Profile Image
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleImageUpload}
            className={styles.input}
          />
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
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
          {errors.note && <span className={styles.error}>{errors.note}</span>}
        </label>

        {user.user.role !== 'guest' ? (
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className={styles.submitButton}
            style={{ backgroundColor: 'gray', cursor: 'not-allowed' }}
          >
            You are guest so can&apos;t perform this action
          </button>
        )}
        <div className={styles.label}>
          {errors.something && (
            <small className="error">{errors.something}</small>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewMember;

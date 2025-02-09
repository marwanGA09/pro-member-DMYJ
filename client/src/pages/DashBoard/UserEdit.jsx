import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import axios from '../../Utils/axios';
import styles from './UserEdit.module.scss';
import { AdvancedImage } from '@cloudinary/react';
import { FaCamera } from 'react-icons/fa';

function UserEdit() {
  const userLocation = useLocation();
  const userId = userLocation?.state?.id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    date_of_birth: '4/3/2002',
    sector: 'dawah',
    role: 'admin',
    sex: 'male',
    profileUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`, {
          withCredentials: true,
        });
        console.log('data', response.data);
        setFormData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.log('error', err);
        setError(err.message || 'Failed to fetch user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    uploadData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/upload`,
        { method: 'POST', body: uploadData }
      );
      const data = await response.json();
      setFormData((prev) => ({ ...prev, profileUrl: data.public_id }));
    } catch (error) {
      setError('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.patch(`/users/${userId}`, formData, {
        withCredentials: true,
      });
      navigate(`/users/${userId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME },
  });
  const profileImg = cld.image(formData.profileUrl);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageSection}>
          <div className={styles.imageUploadWrapper}>
            <div className={styles.imageContainer}>
              <AdvancedImage
                cldImg={profileImg}
                className={styles.profileImage}
              />
              <div className={styles.imageOverlay}>
                <label htmlFor="profileUpload" className={styles.uploadLabel}>
                  <FaCamera className={styles.cameraIcon} />
                  <span>Update Photo</span>
                </label>
              </div>
            </div>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className={styles.fileInput}
              id="profileUpload"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Middle Name</label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth?.split('T')[0]}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Sex</label>
          <select name="sex" value={formData.sex} onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Sector</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
          >
            <option value="dawah">Dawah</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={styles.submitButton}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;

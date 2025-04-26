import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../Utils/axios';
import styles from './UserEdit.module.scss';
import { FaCamera } from 'react-icons/fa';
import { globalContext } from '../../components/ContextProvider';
import { Cloudinary } from '@cloudinary/url-gen/index';
import { AdvancedImage } from '@cloudinary/react';

function UserEdit() {
  const { user: currentLogged, setUser } = useContext(globalContext);

  //   console.log('current', currentLogged.user.role);
  const userLocation = useLocation();
  const userId = userLocation?.state?.id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    // username: '',
    email: '',
    phone_number: '',
    date_of_birth: new Date(),
    sector: 'dawah',
    role: 'guest',
    sex: '',
    profileUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const sectors = [
    'economy',
    'academy',
    'social',
    'dawah',
    'management',
    'other',
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`, {
          withCredentials: true,
        });
        setFormData({
          ...response.data.data,
          sex: formData?.sex || response.data.data.sex || 'male',
        });
        // console.log('vvvvvvvvvvvvvvvvvvvvvvvv');
        // console.log(formData?.sex);
        // console.log(response.data.data.sex);
        // console.log(formData?.sex || response.data.data);
        // console.log({
        //   ...response.data.data,
        //   sex: formData?.sex || response.data.data.sex || 'male',
        // });
        // console.log('vvvvvvvvvvvvvvvvvvvvvvvv');

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
    console.log('input change on userEdit', { name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    console.log('handle date change on useredit', date.target.value);
    setFormData((prev) => ({
      ...prev,
      [field]: date.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log('handle image change on useredit', file);
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileUrl: file, // Preview the uploaded image
        // profileImage: URL.createObjectURL(file), // Preview the uploaded image
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log('form', formData);
    // profileUrl;
    // first_name;
    // middle_name;
    // last_name;
    // date_of_birth;
    // email;
    // sector;
    // role;
    // phone_number;
    // sex;
    const formDataPayload = new FormData();
    formDataPayload.append('profileUrl', formData.profileUrl);
    formDataPayload.append('first_name', formData.first_name);
    formDataPayload.append('middle_name', formData.middle_name);
    formDataPayload.append('last_name', formData.last_name);
    formDataPayload.append(
      'date_of_birth',
      new Date(formData.date_of_birth).toISOString()
    );
    formDataPayload.append('email', formData.email);
    formDataPayload.append('sector', formData.sector);
    formDataPayload.append('role', formData.role);
    formDataPayload.append('phone_number', formData.phone_number);
    formDataPayload.append('sex', formData.sex);

    console.log(
      'Payload from userFOrm data: ',
      Array.from(formDataPayload.entries())
    );
    console.log({ formDataPayload });
    try {
      const response = await axios.patch(`/users/${userId}`, formDataPayload, {
        withCredentials: true,
      });

      const globalData = {
        user: {
          id: response.data.user.id,
          role: response.data.user.role,
          username: response.data.user.username,
          profileUrl: response.data.user.profileUrl,
        },
        // token: response.data.token,
      };

      console.log({ currentLogged });
      console.log({ globalData });
      if (currentLogged.user.id === userId) {
        console.log('UPDATE OUR SELF');
        setUser(globalData);
      }
      console.log({ updatedUser: { ...response.data.data } });
      navigate(`/users/${userId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
      console.log('Error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_NAME },
  });

  const profileImg = cld.image(formData?.profileUrl);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageSection}>
          <div className={styles.imageUploadWrapper}>
            <div className={styles.imageContainer}>
              {/* https://res.cloudinary.com/dugvpesxp/image/upload/v1/members/photo/undefined-316?_a=DAJCwlWIZAA0 */}
              {/* {console.log(profileImg.publicID.includes('members/photo'))} */}
              {profileImg.publicID.includes('members/photo') ? (
                <AdvancedImage
                  cldImg={profileImg}
                  className={styles.profileImage}
                />
              ) : (
                <img
                  src={
                    formData.profileUrl
                      ? URL.createObjectURL(formData.profileUrl)
                      : '/default-profile.avif'
                  }
                  alt="Profile Preview"
                  className={styles.profileImage}
                />
              )}
              {/* {console.log(
                'formdata.profileUrl',
                formData.profileUrl,
                formData.profileUrl
                  ? URL.createObjectURL(formData.profileUrl)
                  : 'default'
              )} */}
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

        {/* <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div> */}

        {/* <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div> */}

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
            value={formData.date_of_birth}
            // onChange={handleInputChange}
            onChange={(date) => handleDateChange(date, 'date_of_birth')}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Sex</label>
          <select name="sex" value={formData.sex} onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {currentLogged.user.role === 'admin' && (
          <div className={styles.formGroup}>
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="guest">Guest</option>
            </select>
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Sector</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleInputChange}
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
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

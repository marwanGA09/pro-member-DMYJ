import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';

import axios from './../../Utils/axios';
import styles from './User.module.scss';
import { AdvancedImage } from '@cloudinary/react';
import LoadingPage from '../../components/LoadingPage';
// import { globalContext } from '../../context/GlobalContext';

function User() {
  const { userId } = useParams();
  const userIdLocation = useLocation();
  const CurrentUserId = userId || userIdLocation?.state.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  //   const { user: loggedInUser } = useContext(globalContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${CurrentUserId}`, {
          withCredentials: true,
        });
        console.log(response.data.data);
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        // catch (err) {
        //   setError(err.message || 'Failed to fetch user data.');
        // }
        setLoading(false);
        navigate('/error', {
          state: {
            message:
              err?.response?.data?.message ||
              err.message ||
              'Failed to fetch member data.',
          },
          replace: true, // optional: avoids back button returning to error
        });
      }
    };

    fetchUserData();
  }, [CurrentUserId]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (loading) return <LoadingPage />;

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
    },
  });

  const profileUrl = cld.image(user.profileUrl);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.userProfile}>
          <div className={styles.imageContainer}>
            <AdvancedImage
              cldImg={profileUrl}
              className={styles.profileImage}
            />
          </div>
          <h2>
            {user.first_name} {user.middle_name} {user.last_name}
          </h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Sector:</strong> {user.sector}
          </p>
          <p>
            <strong>Sex:</strong> {user.sex}
          </p>
          <p>
            <strong>Age:</strong> {calculateAge(user.date_of_birth)}
          </p>
          <p>
            <strong>Total Registered Members by {user.first_name}:</strong>
            {user.members}
          </p>
          <p>
            <strong>Total Payments collected by {user.first_name}:</strong>
            {user.payments}
          </p>
          <p>
            <strong>Joined:</strong>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <button className={styles.editButton}>
            <Link
              to={'edit'}
              // to={'../edit-user'}
              state={{ id: CurrentUserId }}
            >
              Edit My Profile
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default User;

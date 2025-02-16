import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';

import axios from './../../Utils/axios';
import styles from './User.module.scss';
import { AdvancedImage } from '@cloudinary/react';
// import { globalContext } from '../../context/GlobalContext';

function User() {
  const { userId } = useParams();
  const userIdLocation = useLocation();
  const CurrentUserId = userId || userIdLocation?.state.id;
  console.log({ userId });
  console.log({ userIdLocation });
  console.log({ CurrentUserId });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message || 'Failed to fetch user data.');
        setLoading(false);
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

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

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
            />{' '}
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
            <strong>Total Registered Members by {user.first_name}:</strong>{' '}
            {user.members}
          </p>
          <p>
            <strong>Total Payments collected by {user.first_name}:</strong>{' '}
            {user.payments}
          </p>
          <p>
            <strong>Joined:</strong>{' '}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
}

export default User;

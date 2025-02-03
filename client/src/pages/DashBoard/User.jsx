import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from './../../Utils/axios';
import styles from './User.module.scss';
// import { globalContext } from '../../context/GlobalContext';

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   const { user: loggedInUser } = useContext(globalContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`, {
          withCredentials: true,
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

  return (
    <>
      {/* <div>
        <Link
          className={styles.newButton}
          to={`./new-action`}
          state={{
            userId,
            role: loggedInUser?.user?.role,
          }}
        >
          New Action
        </Link>
      </div> */}
      <div className={styles.container}>
        <div className={styles.userProfile}>
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

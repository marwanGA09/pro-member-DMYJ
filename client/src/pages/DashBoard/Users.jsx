import { useEffect, useState } from 'react';
import axios from './../../Utils/axios';
import { Link } from 'react-router-dom';
import styles from './Users.module.scss';
import capitalizeFirstLetter from '../../Utils/capitalizeFirstLetter';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Users per page

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('users', {
        withCredentials: true,
        params: { page, limit },
      });

      const { data, totalUsers } = response.data;
      setUsers(data);
      setTotalPages(Math.ceil(totalUsers / limit));
      console.log({ data, totalUsers });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Members</h2>

      <div className={styles.userList}>
        {users.map((user) => (
          <Link to={`./${user.id}`} key={user.id} className={styles.userCard}>
            <h3>
              {`${capitalizeFirstLetter(user.first_name)} ${
                capitalizeFirstLetter(user.middle_name) || ''
              } ${capitalizeFirstLetter(user.last_name)}`.trim()}
            </h3>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Sector:</strong>{' '}
              {capitalizeFirstLetter(user.sector) || '---'}
            </p>
            <p>
              <strong>Role:</strong> {capitalizeFirstLetter(user.role)}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersPage;

import styles from './LoadingPage.module.scss';
import { FaSpinner } from 'react-icons/fa';

const LoadingPage = () => {
  return (
    <div className={styles.loadingContainer}>
      <FaSpinner className={styles.spinner} />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;

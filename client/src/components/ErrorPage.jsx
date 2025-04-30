import { useLocation, useNavigate, useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import { FaArrowLeft, FaHome, FaRedoAlt } from 'react-icons/fa';

// const ErrorPage = () => {
//   const navigate = useNavigate();
//   const error = useRouteError();

//   return (
//     <div className={styles.errorPage}>
//       <h1>🚨 Oops! Something went wrong.</h1>
//       <p>{error?.message || 'An unexpected error occurred.'}</p>
//       <p>{error}</p>
//       <div className={styles.buttons}>
//         <button onClick={() => window.location.reload()}>
//           <FaRedoAlt /> Reload
//         </button>
//         <button onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Go Back
//         </button>
//         <button onClick={() => navigate('/')}>
//           <FaHome /> Home
//         </button>
//       </div>
//     </div>
//   );
// };
const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || 'An unexpected error occurred.';

  return (
    <div className={styles.errorPage}>
      <h1>🚨 Oops! Something went wrong.</h1>

      {import.meta.env.MODE === 'development' ? (
        <p>{message}</p> // Show full message in development
      ) : (
        <p>Please try again later or contact support.</p> // Hide message in production
      )}

      <div className={styles.buttons}>
        <button onClick={() => window.location.reload()}>
          <FaRedoAlt /> Reload
        </button>
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
        <button onClick={() => navigate(-1)}>
          <FaHome /> Home
        </button>
      </div>
    </div>
  );
};
export default ErrorPage;

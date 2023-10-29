import styles from './header.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../redux/slices/userDataSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const userData = useAppSelector((state) => state.userDataSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.header_title}>Task board</div>
      <div className={styles.links}>
        <Link to="/">
          <div className={styles.link}>Dashboard</div>
        </Link>
        {!userData.isLoggedIn ? (
          <>
            <Link to="/login">
              <div className={styles.link}>Login</div>
            </Link>
            <Link to="/register">
              <div className={styles.link}>Register</div>
            </Link>
          </>
        ) : (
          <div
            className={styles.link}
            onClick={() => {
              dispatch(logoutUser());
              navigate('/login');
            }}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
};

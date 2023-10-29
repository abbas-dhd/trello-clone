import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginUser } from '../../redux/slices/userDataSlice';
import { UserDataSliceType } from '../../types/types';
import { checkIfValidEmail } from '../../utils/login-utils';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateInput = () => {
    if (email && password) {
      if (checkIfValidEmail(email)) {
        validateLogin(email, password);
      } else {
        setIsFormValid(false);
        setErrorMessage('Email is not valid');
      }
    } else {
      setIsFormValid(false);
      setErrorMessage('Email or Password are invalid');
    }
  };

  const validateLogin = (email: string, password: string) => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      const parsedUserData = JSON.parse(userData) as UserDataSliceType;
      if (
        parsedUserData.userEmail === email &&
        parsedUserData.password === password
      ) {
        dispatch(loginUser());
        navigate('/', { replace: true });
        setIsFormValid(true);
        setErrorMessage('');
      } else {
        setIsFormValid(false);
        setErrorMessage('Email or Password are incorrect');
      }
    } else {
      setIsFormValid(false);
      setErrorMessage('User not found');
    }
  };

  return (
    <div className={styles.login_container}>
      <h1 className={styles.login_title}>Login</h1>
      <div className={styles.input_container}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {!isFormValid && (
        <p className={styles.error_info}>
          {errorMessage || 'Email or Password are invalid'}
        </p>
      )}
      <button className={styles.submit_button} onClick={validateInput}>
        Login
      </button>
    </div>
  );
};

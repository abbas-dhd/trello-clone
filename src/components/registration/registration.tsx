import styles from './registration.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addNewUser } from '../../redux/slices/userDataSlice';
import { checkIfValidEmail } from '../../utils/login-utils';

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateInput = () => {
    if (email && password) {
      if (checkIfValidEmail(email)) {
        registerUser(email, password);
      } else {
        setIsFormValid(false);
        setErrorMessage('Email is not valid');
      }
    } else {
      setIsFormValid(false);
      setErrorMessage('Email or Password are invalid');
    }
  };

  const registerUser = (email: string, password: string) => {
    dispatch(addNewUser({ userEmail: email, password }));
    navigate('/login', { replace: true });
    setIsFormValid(true);
    setErrorMessage('');
  };

  return (
    <div className={styles.registration_container}>
      <h1 className={styles.register_title}>Register</h1>
      <div className={styles.input_container}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="abc@gmail.com"
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
        Create Account
      </button>
    </div>
  );
};

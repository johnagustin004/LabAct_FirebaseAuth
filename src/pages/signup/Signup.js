import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import styles from './Signup.module.css';
import { create_user } from '../../services/authService';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await create_user(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value);
      navigate('/');
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Register</h2>
      <div className={styles['input-container']}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            ref={emailRef}
            className={styles.input}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            ref={passwordRef}
            className={styles.input}
          />
        </label>
        <label>
          <span>Display Name:</span>
          <input
            type="text"
            ref={displayNameRef}
            className={styles.input}
          />
        </label>
      </div>
      <div className={styles['btn-container']}>
        {!isPending && <button className={styles.btn}>Sign Up</button>}
        {isPending && <button className={styles.btn} disabled>Loading</button>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

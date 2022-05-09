import styles from './style.module.scss';
import { Modal } from './Modal';
import { useState } from 'react';

export const EditProfile: React.FC = () => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);
  const closeModalWindow = () => {
    setIsModalWindowOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input name="name" />
          </label>
          <label>
            Login:
            <input name="login" />
          </label>
          <label>
            Password:
            <input name="password" />
          </label>
          <button type="submit">Save Changes</button>
        </form>
        <button className={styles.deleteAccount} onClick={() => setIsModalWindowOpen(true)}>
          Delete account
        </button>
      </div>
      <Modal isModalWindowOpen={isModalWindowOpen} closeModalWindow={closeModalWindow} />
    </>
  );
};

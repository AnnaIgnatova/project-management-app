import styles from './style.module.scss';
import Portal from '../Portal';

type Props = {
  isModalWindowOpen: boolean;
  closeModalWindow: () => void;
};

export const Modal = ({ isModalWindowOpen, closeModalWindow }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return;
  };

  return (
    <>
      {isModalWindowOpen && (
        <Portal>
          <div className={styles.overlay}>
            <div className={styles.window}>
              <p>Are you sure you want to delete your account?</p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                  Enter the word <b>delete</b> in the input
                  <input onChange={handleChange} />
                </label>
                <div className={styles.buttons}>
                  <button onClick={closeModalWindow}>Cancel</button>
                  <button>Delete</button>
                </div>
              </form>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

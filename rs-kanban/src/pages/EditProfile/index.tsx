import styles from './style.module.scss';

export const EditProfile: React.FC = () => {
  return (
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
      <button className={styles.deleteAccount}>Delete account</button>
    </div>
  );
};

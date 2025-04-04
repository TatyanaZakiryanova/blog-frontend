import { IUserInfo } from './types';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, createdAt, updatedAt }: IUserInfo) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{new Date(createdAt).toLocaleString()}</span>
        <span className={styles.additional}>
          {updatedAt ? `обновлено: ${new Date(updatedAt).toLocaleString()}` : ''}
        </span>
      </div>
    </div>
  );
};

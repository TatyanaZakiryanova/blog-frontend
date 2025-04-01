import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from './Login.module.scss';

export const Login = () => {
  return (
    <div className={styles.root}>
      <Typography variant="h6">Вход в аккаунт</Typography>

      <TextField className={styles.field} label="Email" fullWidth />
      <TextField className={styles.field} label="Пароль" fullWidth />

      <Button size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </div>
  );
};

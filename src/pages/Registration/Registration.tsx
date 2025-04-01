import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import styles from './Registration.module.scss';

export const Registration = () => {
  return (
    <div className={styles.root}>
      <Typography variant="h6">Создание аккаунта</Typography>
      <Avatar sx={{ width: 100, height: 100 }} />

      <TextField className={styles.field} label="Имя" fullWidth />
      <TextField className={styles.field} label="Email" fullWidth />
      <TextField className={styles.field} label="Пароль" fullWidth />

      <Button size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </div>
  );
};

import styles from './Comment.module.scss';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Comment = () => {
  return (
    <div className={styles.root}>
      <Avatar classes={{ root: styles.avatar }} src="https://mui.com/static/images/avatar/1.jpg" />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
        />
        <Button variant="contained">Отправить</Button>
      </div>
    </div>
  );
};

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { fetchUserData } from '../../redux/auth/asyncActions';
import { UserData } from '../../redux/auth/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './Login.module.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.data);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    const resultAction = await dispatch(fetchUserData(values));
    if (fetchUserData.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      window.localStorage.setItem('token', user.token);
    } else {
      setOpenAlert(true);
      console.error('Ошибка авторизации');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <Typography variant="h6">Вход в аккаунт</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          className={styles.field}
          label="Email"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          autoComplete="email"
          {...register('email', {
            required: 'Введите почту',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Некорректный формат почты',
            },
          })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 5,
              message: 'Пароль должен быть не менее 5 символов',
            },
          })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          Неверный логин или пароль
        </Alert>
      </Snackbar>
    </div>
  );
};

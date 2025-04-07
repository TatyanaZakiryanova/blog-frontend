import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { fetchRegister } from '../../redux/auth/asyncActions';
import { UserDataRegister } from '../../redux/auth/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './Registration.module.scss';

export const Registration = () => {
  const isAuth = useAppSelector((state) => state.auth.data);
  const dispatch = useAppDispatch();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserDataRegister>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserDataRegister> = async (values) => {
    const resultAction = await dispatch(fetchRegister(values));
    if (fetchRegister.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      window.localStorage.setItem('token', user.token);
    } else {
      const errorMessage = resultAction.payload?.message || 'Неизвестная ошибка';
      setErrorMessage(errorMessage);
      setOpenAlert(true);
      console.error('Ошибка регистрации:', resultAction.error);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <Typography variant="h6">Регистрация</Typography>
      <Avatar sx={{ width: 100, height: 100 }} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          className={styles.field}
          label="Имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {
            required: 'Укажите имя',
            minLength: {
              value: 2,
              message: 'Имя должно быть не менее 2 символов',
            },
          })}
        />
        <TextField
          className={styles.field}
          label="Email"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
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
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 5,
              message: 'Пароль должен быть не менее 5 символов',
            },
          })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

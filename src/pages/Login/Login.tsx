import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserData } from '../../redux/auth/asyncActions';
import { UserData } from '../../redux/auth/types';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      email: 'test@test.ru',
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
      console.error('Ошибка авторизации:', resultAction.error);
      alert('Ошибка авторизации');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <Typography variant="h6">Вход</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          className={styles.field}
          label="Email"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Введите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Введите пароль' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </div>
  );
};

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
  const authError = useAppSelector((state) => state.auth.authError);
  const dispatch = useAppDispatch();
  const [openAlert, setOpenAlert] = useState<boolean>(false);

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
      window.localStorage.setItem('accessToken', user.accessToken);
    } else {
      setOpenAlert(true);
      console.error('Registration error');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <Typography variant="h6">Sign up</Typography>
      <Avatar sx={{ width: 100, height: 100 }} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <TextField
          className={styles.field}
          label="Name"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {
            required: 'Enter your name',
            minLength: {
              value: 2,
              message: 'The name must be at least 2 characters long',
            },
          })}
        />
        <TextField
          className={styles.field}
          label="Email"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          autoComplete="email"
          {...register('email', {
            required: 'Enter your email',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Incorrect email format',
            },
          })}
        />
        <TextField
          className={styles.field}
          label="Password"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Enter your password',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters long',
            },
          })}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Sign up
        </Button>
      </form>
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="error" sx={{ width: '100%' }}>
          {authError && authError.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

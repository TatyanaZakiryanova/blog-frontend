import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { fetchUserData } from '../../redux/auth/asyncActions';
import { UserDataLogin } from '../../redux/auth/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './Login.module.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.data);
  const authError = useAppSelector((state) => state.auth.authError);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserDataLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<UserDataLogin> = async (values) => {
    const resultAction = await dispatch(fetchUserData(values));
    if (fetchUserData.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      window.localStorage.setItem('accessToken', user.accessToken);
    } else {
      setOpenAlert(true);
      console.error('Authorization error');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <Typography variant="h6">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          Log in
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

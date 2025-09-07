import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { fetchRegister } from '../../redux/auth/asyncActions';
import { UserDataRegister } from '../../redux/auth/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import styles from './Registration.module.scss';
import axios from '../../axios';

export const Registration = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const isAuth = useAppSelector((state) => state.auth.data);
  const authError = useAppSelector((state) => state.auth.authError);
  const dispatch = useAppDispatch();

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

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('avatar', file);

      const { data } = await axios.post('/upload-avatar', formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.error('Error uploading avatar:', err);
    }
  };

  const onSubmit: SubmitHandler<UserDataRegister> = async (values) => {
    const payload = {
      ...values,
      avatarUrl,
    };
    const resultAction = await dispatch(fetchRegister(payload));
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="avatar-upload">
          <input
            type="file"
            id="avatar-upload"
            hidden
            onChange={handleChangeFile}
            accept="image/*"
          />
          <div className={styles.avatar}>
            <Avatar
              sx={{ width: 100, height: 100, cursor: 'pointer' }}
              src={avatarUrl || undefined}
            />
            <div className={styles.overlay}>
              <PhotoCameraIcon fontSize="small" />
              <Typography variant="caption">Change</Typography>
            </div>
          </div>
        </label>
        {avatarUrl && (
          <Button
            variant="contained"
            sx={{ fontSize: '12px' }}
            color="error"
            onClick={() => setAvatarUrl('')}
          >
            Remove
          </Button>
        )}
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

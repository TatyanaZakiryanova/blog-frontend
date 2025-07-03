import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ConfirmDialog } from '../UI/ConfirmDialog';
import styles from './Header.module.scss';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.data);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed');
    } finally {
      localStorage.removeItem('accessToken');
      dispatch(logout());
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <ArticleIcon fontSize="large" color="primary" />
            <h1 className={styles.title}>IT BLOG</h1>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <span className={styles.user}>
                  <Avatar src={isAuth.avatarUrl || ''} />
                  {isAuth.fullName}
                </span>
                <Link to="/posts/create">
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button variant="contained" color="secondary" onClick={() => setConfirmOpen(true)}>
                  Log out
                </Button>
                <ConfirmDialog
                  open={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                  onConfirm={() => {
                    handleLogout();
                    setConfirmOpen(false);
                  }}
                  confirmButton="Log out"
                >
                  Are you sure you want to log out?
                </ConfirmDialog>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

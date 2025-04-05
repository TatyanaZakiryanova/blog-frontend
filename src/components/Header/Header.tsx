import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/auth/authSlice';
import { useState } from 'react';
import { ConfirmDialog } from '../ConfirmDialog';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.data);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <ArticleIcon fontSize="large" color="primary" />
            <h1 className={styles.title}>MY BLOG</h1>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Создать пост</Button>
                </Link>
                <Button variant="contained" color="secondary" onClick={() => setConfirmOpen(true)}>
                  Выйти
                </Button>
                <ConfirmDialog
                  open={confirmOpen}
                  onClose={() => setConfirmOpen(false)}
                  onConfirm={() => {
                    handleLogout();
                    setConfirmOpen(false);
                  }}
                >
                  Вы действительно хотите выйти?
                </ConfirmDialog>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Зарегистрироваться</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

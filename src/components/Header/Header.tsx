import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header = () => {
  const isAuth = false;

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
                <Button variant="contained" color="secondary">
                  Выйти
                </Button>
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

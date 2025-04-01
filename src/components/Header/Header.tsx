import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import styles from './Header.module.scss';

export const Header = () => {
  const isAuth = false;

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.logo}>
            <ArticleIcon fontSize="large" color="primary" />
            MY BLOG
          </div>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/posts/create">
                  <Button variant="contained">Создать пост</Button>
                </a>
                <Button variant="contained" color="secondary">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outlined">Войти</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Зарегистрироваться</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

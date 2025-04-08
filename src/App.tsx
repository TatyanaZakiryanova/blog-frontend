import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { CreatePost } from './pages/CreatePost';
import { FullPost } from './pages/FullPost';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { fetchAuth } from './redux/auth/asyncActions';
import { useAppDispatch } from './redux/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<CreatePost />} />
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

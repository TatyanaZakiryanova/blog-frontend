import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { CreatePost } from './pages/CreatePost';
import { FullPost } from './pages/FullPost';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { useAppDispatch } from './redux/hooks';
import { useEffect } from 'react';
import { fetchAuth } from './redux/auth/asyncActions';
import { PrivateRoute } from './components/PrivateRoute';

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
          <Route path="/posts/:id" element={<FullPost />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;

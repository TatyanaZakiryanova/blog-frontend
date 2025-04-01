import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { CreatePost } from './pages/CreatePost';
import { FullPost } from './pages/FullPost';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

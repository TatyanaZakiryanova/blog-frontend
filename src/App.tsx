import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header';
import { FullPost } from './pages/FullPost';
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

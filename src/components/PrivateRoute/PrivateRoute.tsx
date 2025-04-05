import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = Boolean(useAppSelector((state) => state.auth.data));

  return isAuth ? children : <Navigate to="/login" />;
};

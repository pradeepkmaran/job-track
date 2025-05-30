import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  return user && user.username ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../Context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component {...rest} /> : <Navigate to="/connexion" />}
    />
  );
};

// Ajout de la validation des PropTypes
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;

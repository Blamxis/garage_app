import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('authToken');

    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setIsAuthenticated(true);
      setUserRole(decoded.role);
      setUserId(decoded.userId);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    const decoded = jwtDecode(token);
    setDecodedToken(decoded);
    setIsAuthenticated(true);
    setUserRole(decoded.role);
    setUserId(decoded.userId);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setDecodedToken(null);
    setIsAuthenticated(false);
    setUserRole("");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, decodedToken, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

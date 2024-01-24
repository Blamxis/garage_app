import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import './LoginForm.scss';

function jwtDecode(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: "",
    Mdp: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiURL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiURL}auth/login`, formData);

      if (response.status === 200 && response.data && response.data.token) {
        login(response.data.token); // Utilisez la fonction login du contexte

        const decodedToken = jwtDecode(response.data.token);
        if (decodedToken.role === 1) {
          navigate("/admin/dashboard");
        } else if (decodedToken.role === 2) {
          navigate("/employee/dashboard");
        }
      } else {
        setError("E-mail ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Email" className="form-label">E-mail</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Mdp" className="form-label">Mot de passe</label>
          <input
            type="password"
            id="Mdp"
            name="Mdp"
            value={formData.Mdp}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-login">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;


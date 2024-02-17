import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="left">Groupe Parrot &copy; 2024</div>
            <div className="right">
              <Link to="/mentions-legales" className="footer-link">Mentions Légales</Link>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

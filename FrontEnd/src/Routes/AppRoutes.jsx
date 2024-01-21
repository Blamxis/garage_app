import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; 

import HomePage from '../Pages/HomePage';
import Mecanique from '../Pages/Mecanique';
import Carrosserie from '../Pages/Carrosserie';
import Revision from '../Pages/Revision';
import ParcAuto from '../Pages/ParcAuto';
import CarInfos from '../Pages/CarInfos';
import Avis from '../Pages/Avis';
import Contact from '../Pages/Contact';
import Connexion from '../Pages/Connexion';
import DashboardAdmin from '../Pages/DashboardAdmin';
import DashboardEmployee from '../Pages/DashboardEmployee';
import NotFoundPage from '../Pages/NotFoundPage';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mecanique" element={<Mecanique />} />
      <Route path="/carrosserie" element={<Carrosserie />} />
      <Route path="/revision" element={<Revision />} />
      <Route path="/parc-auto" element={<ParcAuto />} />
      <Route path="/parc-auto/:id" element={<CarInfos />} />
      <Route path="/avis" element={<Avis />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route 
        path="/admin/dashboard" 
        element={isAuthenticated ? <DashboardAdmin /> : <Navigate to="/connexion" />}
      />
      <Route 
        path="/employee/dashboard" 
        element={isAuthenticated ? <DashboardEmployee /> : <Navigate to="/connexion" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;



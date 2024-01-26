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
import DashboardAdmin from '../Pages/DashboardAdmin/DashboardAdmin';
import DashboardEmployee from '../Pages/DashboardEmployee';
import NotFoundPage from '../Pages/NotFoundPage';

// Routes Dashboard

import Users from '../Pages/UserDash';
import Annonces from '../Pages/AnnonceDash';
import Services from '../Pages/ServicesDash';
import Voitures from '../Pages/VoituresDash';
import Marques from '../Pages/MarquesDash';
import Modeles from '../Pages/ModeleDash';
import OptionsEquipements from '../Pages/OptionsDash';
import Messages from '../Pages/MessagesDash';
import AvisClients from '../Pages/AvisDash';
import HorairesGarage from '../Pages/HorairesDash';

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
      <Route path="/admin/dashboard" element={isAuthenticated ? <DashboardAdmin /> : <Navigate to="/connexion" />}>
      <Route index element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="annonces" element={<Annonces />} />
        <Route path="services" element={<Services />} />
        <Route path="voitures" element={<Voitures />} />
        <Route path="marques" element={<Marques />} />
        <Route path="modeles" element={<Modeles />} />
        <Route path="options" element={<OptionsEquipements />} />
        <Route path="messages" element={<Messages />} />
        <Route path="avis-clients" element={<AvisClients />} />
        <Route path="horaires-garage" element={<HorairesGarage />} />
      </Route>
      <Route path="/employee/dashboard" element={isAuthenticated ? <DashboardEmployee /> : <Navigate to="/connexion" />}>
      <Route index element={<Navigate to="annonces" />} />
        <Route path="annonces" element={<Annonces />} />
        <Route path="services" element={<Services />} />
        <Route path="voitures" element={<Voitures />} />
        <Route path="marques" element={<Marques />} />
        <Route path="modeles" element={<Modeles />} />
        <Route path="options" element={<OptionsEquipements />} />
        <Route path="messages" element={<Messages />} />
        <Route path="avis-clients" element={<AvisClients />} />
        <Route path="horaires-garage" element={<HorairesGarage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;



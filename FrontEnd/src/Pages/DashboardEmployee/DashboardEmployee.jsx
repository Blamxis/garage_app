import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBarEmp";
import TopNav from "../../Components/TopNav/TopNav";
import { Helmet } from 'react-helmet-async';
import './DashboardEmp.scss';

const DashboardEmployee = () => {
  const pageTitle = "Tableau de Bord Employé - PAT Garage";
  const pageDescription = "Interface dédiée aux employés pour gérer leurs tâches et activités quotidiennes.";

  return (
    <>
      <Helmet>
        {/* Métadonnées standards */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <Sidebar />
      <div className="main">
        <div className="main__content">
          <TopNav />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardEmployee;

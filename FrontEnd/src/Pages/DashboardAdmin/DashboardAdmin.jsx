import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar/Sidebar";
import TopNav from "../../Components/TopNav/TopNav";
import './DashboardAdmin.scss'

const DashboardAdmin = () => {
  return (
    <>
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

export default DashboardAdmin;

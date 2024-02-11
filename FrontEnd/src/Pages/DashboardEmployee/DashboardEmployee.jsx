import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar/SideBarEmp";
import TopNav from "../../Components/TopNav/TopNav";
import './DashboardEmp.scss'

const DashboardEmployee = () => {
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

export default DashboardEmployee;
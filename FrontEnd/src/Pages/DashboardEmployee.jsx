import { Outlet } from "react-router-dom";

const DashboardEmployee = () => {
  return (
    <>
      <div className="main">
        <div className="main__content">
          <h1>Page de DashBoardEmployee</h1>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardEmployee;
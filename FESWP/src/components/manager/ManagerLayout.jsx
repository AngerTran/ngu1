import { Outlet } from 'react-router-dom';
import { ManagerSidebar } from './ManagerSidebar';
import './ManagerLayout.css';

const ManagerLayout = () => {
  return (
    <div className="manager-layout">
      <ManagerSidebar />
      <main className="manager-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;

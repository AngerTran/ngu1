import { Outlet } from 'react-router-dom';
import { ConsultantSidebar } from './ConsultantSidebar';
import './ConsultantLayout.css';

const ConsultantLayout = () => {
  return (
    <div className="consultant-layout">
      <ConsultantSidebar />
      <main className="consultant-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default ConsultantLayout;

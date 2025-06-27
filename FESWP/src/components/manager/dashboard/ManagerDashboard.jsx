import DashboardHeader from './DashboardHeader';
import OverviewCards from './OverviewCards';
import PerformanceSection from './PerformanceSection';
import RecentActivitiesSection from './RecentActivitiesSection';
import ReportSummarySection from './ReportSummarySection';

const ManagerDashboard = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <OverviewCards />
      <PerformanceSection />
      <RecentActivitiesSection />
      <ReportSummarySection />
    </div>  
  );
};

export default ManagerDashboard;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServicePage from './pages/ServicePage';
import ConsultantPage from './pages/ConsultantPage';
import BlogPage from './pages/BlogPage';
import { AuthProvider } from './context/AuthContext';
import ConsultantProfile from './components/consultants/ConsultantProfile';

import BlogDetailPublic from './components/blogs/BlogDetailPublic';

// Profile layout & pages
import Profile from './components/profile/Profile';
import PersonalInfo from './components/profile/pages/PersonalInfo';
import AccountInfo from './components/profile/pages/AccountInfo';
import NotificationSettings from './components/profile/pages/NotificationSettings';
import ReproductiveHealth from './components/profile/pages/ReproductiveHealth';
import ServiceHistory from './components/profile/pages/ServiceHistory';
import ConsultantScheduleSetup from './components/profile/pages/ConsultantScheduleSetup';
import ConsultantAppointments from './components/profile/pages/ConsultantAppointments';
import UserAppointments from './components/profile/pages/UserAppointments';

// Manager Layout & Pages
import ManagerLayout from './components/manager/ManagerLayout';
import ManagerDashboard from './components/manager/dashboard/ManagerDashboard';
import UserManagementPage from './components/manager/UserManagement/UserManagementPage';
import ManagerCM from './components/manager/ConsultantManagement/ManagerCM';
import ManagerStaffManage from './components/manager/StaffManagement/ManagerStaffManage';
import TestingServiceManage from './components/manager/ServiceManagement/TestingServiceManage';
import ConsultingServiceManage from './components/manager/ServiceManagement/ConsultingServiceManage';
import ManagerBlogManage from './components/manager/BlogsManagement/ManagerBlogManage';
import ManagerFM from './components/manager/FeedbackManagement/ManagerFM';
import ManagerQA from './components/manager/Q&AManagement/ManagerQA';

import BlogDetail from './components/manager/BlogsManagement/BlogDetail';
import ServiceDetail from './components/manager/ServiceManagement/ServiceDetail';


// Consultant Layout & Pages
import ConsultantLayout from './components/ConsultantManagement/ConsultantLayout';
import ConsultantDashboard from './components/ConsultantManagement/Dashboard/ConsultantDashboard';
import ConsultingSchedule from './components/ConsultantManagement/ConsultingSchedule/ConsultingSchedule';
import ConsultantQuestion from './components/ConsultantManagement/Question/ConsultantQuestion';
import ConsultantEvaluate from './components/ConsultantManagement/Evaluate/ConsultantEvaluate';
import ConsultantMessage from './components/ConsultantManagement/Message/ConsultantMessage';

// Staff Layout & Pages
import StaffLayout from './components/staff/StaffLayout';
import StaffHome from './components/staff/Home/StaffHome';
import TestSchedule from './components/staff/Schedule/TestSchedule';
import TestResults from './components/staff/Result/TestResults';
import MedicalServices from './components/staff/Service/MedicalServices';
import MedicalBlog from './components/staff/Blog/MedicalBlog';
import StaffBlogCreate from './components/staff/Blog/StaffBlogCreate';
import StaffBlogDetail from './components/staff/Blog/StaffBlogDetail';
import StaffBlogEdit from './components/staff/Blog/StaffBlogEdit';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/consultants" element={<ConsultantPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPublic />} />

          {/* ✅ Consultant profile DETAIL nằm NGOÀI layout */}
          <Route path="/consultant/:consultantId" element={<ConsultantProfile />} />

          {/* ✅ Consultant dashboard & quản lý nằm TRONG layout */}
          <Route path="/consultant" element={<ConsultantLayout />}>
            <Route index element={<ConsultantDashboard />} />
            <Route path="schedule" element={<ConsultingSchedule />} />
            <Route path="chat" element={<ConsultantMessage />} />
            <Route path="questions" element={<ConsultantQuestion />} />
            <Route path="reviews" element={<ConsultantEvaluate />} />
          </Route>

          {/* Profile layout + nested tabs */}
          <Route path="/profile" element={<Profile />}>
            <Route index element={<PersonalInfo />} />
            <Route path="info" element={<PersonalInfo />} />
            <Route path="account" element={<AccountInfo />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="health" element={<ReproductiveHealth />} />
            <Route path="history" element={<ServiceHistory />} />
            <Route path="appointments" element={<UserAppointments />} />
            <Route path="schedule-setup" element={<ConsultantScheduleSetup />} />
            <Route path="consultant-appointments" element={<ConsultantAppointments />} />
          </Route>

          {/* Staff layout + nested pages */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<StaffHome />} />
            <Route path="schedule" element={<TestSchedule />} />
            <Route path="results" element={<TestResults />} />
            <Route path="services" element={<MedicalServices />} />
            <Route path="blogs" element={<MedicalBlog />} />
            <Route path="blogs/create" element={<StaffBlogCreate />} />
            <Route path="blogs/:id" element={<StaffBlogDetail />} />
            <Route path="blogs/edit/:id" element={<StaffBlogEdit />} />
          </Route>

          {/* Manager layout + nested pages */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="consultants" element={<ManagerCM />} />
            <Route path="staffs" element={<ManagerStaffManage />} />
            <Route path="services" element={<TestingServiceManage />} />
            <Route path="services/:id" element={<TestingServiceDetail />} />
            <Route path="consulting-services" element={<ConsultingServiceManage />} />
            <Route path="consulting-services/:id" element={<ConsultingServiceDetail />} />
            <Route path="blogs" element={<ManagerBlogManage />} />
            <Route path="blogs/:id" element={<BlogDetail />} />
            <Route path="feedbacks" element={<ManagerFM />} />
            <Route path="qna" element={<ManagerQA />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

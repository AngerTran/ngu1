import { Outlet } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <ProfileSidebar />
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;

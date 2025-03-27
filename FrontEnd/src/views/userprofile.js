import React, { useState, useEffect } from 'react';
import './userprofile.css';
import Header from './header';
import { getUserProfile, updateUserProfile, updateUserPassword, uploadAvatar, deleteUserProfile } from '../Service/api'; // Import your API functions
import Footer from './footer1';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [avatar, setAvatar] = useState('/placeholder.svg');
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setName(profile.name);
        setEmail(profile.email);
        setCnic(profile.cnic);
         // Ensure the avatar is set
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ name, email });
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      await updateUserPassword(currentPassword, newPassword);
      alert('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      alert('Failed to update password');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const uploadedAvatar = await uploadAvatar(file);
      setAvatar(uploadedAvatar); // Update avatar with the uploaded image
      alert('Avatar updated successfully');
    } catch (error) {
      alert('Failed to upload avatar');
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await deleteUserProfile();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedInUser");
        window.location.reload();
        alert('Profile deleted successfully');
      } catch (error) {
        alert('Failed to delete profile');
      }
    }
  };

  const ActivityItem = ({ icon, title, time }) => (
    <div className="activity-item">
      <div className="activity-icon">{icon}</div>
      <div className="activity-details">
        <p className="activity-title">{title}</p>
        <p className="activity-time">{time}</p>
      </div>
    </div>
  );

  return (
    <div>
      <Header></Header>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
      <div className="user-profile">
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-header">
            <span role="img" aria-label="car" className="profile-icon">🚗</span>
            AUTOBID PROFILE
            <br></br>
          </h1>
          <p className="profile-description">Manage your car auction profile settings and activities</p>

          <div className="profile-info">
            {/* <img src={avatar} alt="Profile" className="profile-avatar" /> */}
            <div className="profile-details">
              <h2>Name : {name}</h2>
              <h2>Email : {email}</h2>
              <h2>CNIC :  {cnic}</h2>
              {/* <p className="profile-login-time">Last login: 2023-06-15 14:30</p> */}
            </div>
          </div>

          {/* <input type="file" className="avatar-upload" onChange={handleAvatarUpload} accept="image/*" /> */}

          <div className="tab-buttons">
            <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active-tab' : ''}>
              Profile
            </button>
            <button onClick={() => setActiveTab('security')} className={activeTab === 'security' ? 'active-tab' : ''}>
              Security
            </button>
            {/* <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active-tab' : ''}> */}
              {/* Activity */}
            {/* </button> */}
          </div>

          {activeTab === 'profile' && (
            <form onSubmit={handleNameUpdate} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
             
              <button type="submit" className="update-button">Update Profile</button>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordUpdate} className="security-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <button type="submit" className="update-button">Update Password</button>
            </form>
          )}

          {activeTab === 'activity' && (
            <div className="activity-log">
              <h3>Recent Activity</h3>
              <ActivityItem icon="🚗" title="Bid placed on 2018 Tesla Model 3" time="2 hours ago" />
              <ActivityItem icon="⏰" title="Auction ended: 2015 Ford Mustang" time="1 day ago" />
              <ActivityItem icon="👤" title="Profile information updated" time="3 days ago" />
            </div>
          )}
          <br></br>
          <button onClick={handleDeleteProfile} className="delete-button">
            Delete Profile
          </button>
        </div>
      </div>
    </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserProfile;

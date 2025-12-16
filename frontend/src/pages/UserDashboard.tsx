import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, UserData } from '../services/userAuth';

export default function UserDashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white font-serif">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <label className="block text-gray-600">Phone</label>
              <p className="font-medium">{user.phone}</p>
            </div>
          )}
          {user.membershipStatus && (
            <div>
              <label className="block text-gray-600">Membership Status</label>
              <p className="font-medium capitalize">{user.membershipStatus}</p>
            </div>
          )}
        </div>
      </div>

      {user.serviceDetails && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.serviceDetails.branch && (
              <div>
                <label className="block text-gray-600">Branch</label>
                <p className="font-medium">{user.serviceDetails.branch}</p>
              </div>
            )}
            {user.serviceDetails.rank && (
              <div>
                <label className="block text-gray-600">Rank</label>
                <p className="font-medium">{user.serviceDetails.rank}</p>
              </div>
            )}
            {user.serviceDetails.serviceNumber && (
              <div>
                <label className="block text-gray-600">Service Number</label>
                <p className="font-medium">{user.serviceDetails.serviceNumber}</p>
              </div>
            )}
            {user.serviceDetails.fromDate && (
              <div>
                <label className="block text-gray-600">From Date</label>
                <p className="font-medium">
                  {new Date(user.serviceDetails.fromDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {user.serviceDetails.toDate && (
              <div>
                <label className="block text-gray-600">To Date</label>
                <p className="font-medium">
                  {new Date(user.serviceDetails.toDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
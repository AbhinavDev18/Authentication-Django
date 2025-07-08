import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('isLoggedin') !== 'true') navigate('/');
  }, [navigate]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get('http://localhost:8000/api/get-data/', { params: { email } });
        setUsername(response.data.user);
        setEmail(response.data.email);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setUsername("Error");
        setEmail("Error");
      }
    };
    getUserData();
  }, []);

  const handleLogout = () => {
    if(localStorage.getItem('isLoggedin') !== 'true') navigate('/');
    else {
      localStorage.clear();
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 flex flex-col items-center bg-gradient-to-br from-pink-500 to-orange-400 text-white py-10">
        <div className="mb-10">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-pink-500 shadow-lg">
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{username}</h2>
        <p className="text-white/80 mb-8">{email}</p>
        <button className="mt-auto bg-white text-pink-500 font-semibold py-2 px-8 rounded-full shadow hover:bg-pink-100 transition mb-4" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white flex flex-col p-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome, {username.split(" ")[0]}!
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          This is your dashboard. Here you can see your stats and quick info at a glance.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-2xl p-8 shadow-lg flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">LeetCode Score</span>
            <span className="text-4xl font-extrabold">1,234</span>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-2xl p-8 shadow-lg flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">Solved Problems</span>
            <span className="text-4xl font-extrabold">56</span>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-2xl p-8 shadow-lg flex flex-col items-center">
            <span className="text-2xl font-bold mb-2">Streak</span>
            <span className="text-4xl font-extrabold">7 days</span>
          </div>
        </div>

        {/* Welcome/Info Section */}
        <div className="bg-gray-50 rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-2 text-pink-500">Quick Start</h2>
          <p className="text-gray-600 mb-4">
            Ready to practice coding? Head to the problems section or check your latest progress below.
          </p>
          <button className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-semibold py-2 px-6 rounded-full shadow hover:opacity-90 transition">
            <a href="https://leetcode.com/problemset/" target="_blank">Go to Practice</a>
          </button>
        </div>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//     const [activeTab, setActiveTab] = useState("home");

//     return (
//         <div className="min-h-screen flex">
//             {/* Left Sidebar - Navigation */}
//             <div className="w-1/5 flex flex-col items-center bg-gradient-to-br from-pink-500 to-orange-400 text-white p-4">
//                 <h1 className="text-2xl font-bold mb-8 mt-4">Dashboard</h1>
//                 <nav className="w-full space-y-4">
//                     <Link
//                     to="/dashboard/home"
//                     className={`block w-full text-center py-3 px-4 rounded-lg transition ${activeTab === "home" ? "bg-white text-pink-600 font-semibold" : "hover:bg-white/20"}`}
//                     onClick={() => setActiveTab("home")}
//                     >
//                         Home
//                     </Link>
//                     <Link
//                     to="/dashboard/profile"
//                     className={`block w-full text-center py-3 px-4 rounded-lg transition ${activeTab === "profile" ? "bg-white text-pink-600 font-semibold" : "hover:bg-white/20"}`}
//                     onClick={() => setActiveTab("profile")}
//                     >
//                         Profile
//                     </Link>
//                     <Link
//                     to="/dashboard/settings"
//                     className={`block w-full text-center py-3 px-4 rounded-lg transition ${activeTab === "settings" ? "bg-white text-pink-600 font-semibold" : "hover:bg-white/20"}`}
//                     onClick={() => setActiveTab("settings")}
//                     >
//                         Settings
//                     </Link>
//                 </nav>
//                 <button className="mt-auto mb-4 w-full py-2 px-4 rounded-lg bg-white text-pink-600 font-semibold hover:bg-pink-100 transition">
//                     Log Out
//                 </button>
//             </div>

//             {/* Right Panel - Main Content */}
//             <div className="w-4/5 flex flex-col bg-white p-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <h2 className="text-3xl font-bold text-gray-800">
//                         {activeTab === "home" && "Home"}
//                         {activeTab === "profile" && "Profile"}
//                         {activeTab === "settings" && "Settings"}
//                     </h2>
//                     <div className="flex items-center gap-4">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold">
//                             U
//                         </div>
//                         <span className="font-semibold">User</span>
//                     </div>
//                 </div>

//                 {/* Content Area */}
//                 <div className="bg-gray-50 rounded-xl p-6">
//                     {activeTab === "home" && (
//                         <div>
//                             <h3 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h3>
//                             <p className="text-gray-600">
//                                 Manage your projects, track your progress, and explore new features.
//                             </p>
//                         </div>
//                     )}
//                     {activeTab === "profile" && (
//                         <div>
//                             <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
//                             <p className="text-gray-600">
//                                 Update your profile information and manage your account.
//                             </p>
//                         </div>
//                     )}
//                     {activeTab === "settings" && (
//                         <div>
//                             <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
//                             <p className="text-gray-600">
//                                 Change your password, email, and notification preferences.
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Stats or Cards (Example) */}
//                 <div className="grid grid-cols-3 gap-6 mt-8">
//                     <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-xl p-6 shadow-lg">
//                         <h3 className="font-bold">Projects</h3>
//                         <p className="text-2xl mt-2">12</p>
//                     </div>
//                     <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-xl p-6 shadow-lg">
//                         <h3 className="font-bold">Tasks</h3>
//                         <p className="text-2xl mt-2">24</p>
//                     </div>
//                     <div className="bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-xl p-6 shadow-lg">
//                         <h3 className="font-bold">Messages</h3>
//                         <p className="text-2xl mt-2">5</p>
//                     </div>
//                 </div>
//             </div>
//       </div>
//     );
// }

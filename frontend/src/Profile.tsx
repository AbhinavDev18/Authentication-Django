import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export  function ProfileApp (){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

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

  const handleDashboard = () => {
    if(localStorage.getItem('isLoggedin') !== 'true') navigate('/');
    else navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 border-4 border-black rounded-full bg-gradient-to-br from-orange-400 to-pink-500 bg-clip-padding flex items-center justify-center mb-4 text-white text-4xl font-bold">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">{username}</h2>
          <p className="text-gray-500 mb-4">{email}</p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-pink-500 to-orange-400 text-white">
        <h1 className="text-4xl font-extrabold mb-2">Welcome, {username ? username.split(" ")[0] : "User"}!</h1>
        <p className="mb-6 text-lg text-white/90">
          Manage your account details and explore new features.
        </p>
        <button className="border-2 border-white text-white rounded-full px-8 py-2 text-lg font-semibold hover:bg-white hover:text-pink-500 transition duration-200 mb-1" onClick={handleDashboard}>
          Dashboard
        </button>
        <button className="border-2 border-white text-white rounded-full px-8 py-2 text-lg font-semibold hover:bg-white hover:text-pink-500 transition duration-200" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

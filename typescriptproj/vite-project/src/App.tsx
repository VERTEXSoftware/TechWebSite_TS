import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Shoplist from './pages/Shoplist';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const handleRegister = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    return <Navigate to="/" />;
  };


  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>{user ? `${user.firstName}'s Account` : 'My Website'}</title>
        <meta name="description" content={user ? `Account page for ${user.firstName}` : 'Welcome to my website'} />
      </Helmet>
      
      <Router>
        <Header user={user} onLogout={handleLogout} />
        <div className="h-[5%]"></div>
        <Routes>
          <Route path='/' element={<HomePage user={user} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/shoplist" element={<Shoplist user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}/>
          <Route path="/register"  element={user ? <Navigate to="/" /> : <RegisterPage onRegister={handleRegister}/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
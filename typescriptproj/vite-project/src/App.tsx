import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Button } from "./Components/Button";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import BlogPage from './pages/Blog';

import Message from './pages/Message';
import Shoplist from './pages/Shoplist';
import Item from './Components/Item';
import AddItem from './pages/AddItem';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>My Website</title>
        <meta name="description" content="Welcome to my website" />
      </Helmet>
      
      <Router>
        <Header />
        <div className="h-[5%]"></div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/shoplist" element={<Shoplist />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
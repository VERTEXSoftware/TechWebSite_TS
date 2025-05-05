import Header from "./components/Header"
import Footer from "./components/Footer";
import Input from "./Components/Input";
import Text from "./components/Text";
import { Button } from "./Components/Button";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import BlogPage from './pages/Blog'

import Message from './pages/Message'
import Shoplist from './pages/Shoplist'
import Item from './components/Item';
import AddItem from './pages/AddItem';


function App() {

  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="h-[5%]"></div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/message" element={<Message />} />
          <Route path="/shoplist" element={<Shoplist />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

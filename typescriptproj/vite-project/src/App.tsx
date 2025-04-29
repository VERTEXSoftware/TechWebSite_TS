import Header from "./components/Header"
import Footer from "./components/Footer";
import { Button } from "./components/Button";
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import BlogPage from './pages/Blog'

import Message from './pages/Message'
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
        </Routes>
        <div className="p-4">
      <Button size="medium" color="primary" title="Добавить товар" onClick={() => setIsModalOpen(true)}/>
      <AddItem isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={addItem} />
      <div className="mt-4">
        {items.map((item, index) => (<Item key={index} item={item} />))}
      </div>
    </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

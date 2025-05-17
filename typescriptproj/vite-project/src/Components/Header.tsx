import React from 'react';
import { Link } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="w-full h-[5%] bg-red-800 text-white flex items-center justify-between px-4 py-3">
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Главная</Link>
        <Link to="/about" className="hover:text-gray-300">О нас</Link>
        <Link to="/contact" className="hover:text-gray-300">Контакты</Link>
        <Link to="/blog" className="hover:text-gray-300">Блог</Link>
        <Link to="/shoplist" className="hover:text-gray-300">Магазин</Link>
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              <span>{user.firstName} | {user.email}</span>
              {user.role === 'admin' && (<span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Admin</span>)}
              {user.role === 'user' && (<span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">User</span>)}
            </div>
            <button onClick={onLogout} className="hover:text-gray-300">Выход</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">Вход</Link>
            <Link to="/register" className="hover:text-gray-300">Регистрация</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
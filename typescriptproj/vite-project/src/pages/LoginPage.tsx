import React, { useState } from 'react';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input';
import { Text } from '../Components/Text';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
}

interface LoginPageProps {
  onLogin: (user: UserData) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: ''});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка авторизации');
      }
      
      onLogin(data.user);
      navigate('/');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <div className="text-center mb-8">
        <Text size="large" color="primary" weight="bold" className="mb-2">
          Добро пожаловать
        </Text>
        <Text size="medium" color="secondary" weight="normal">
          Введите свои данные для входа
        </Text>
      </div>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 rounded-lg">
          <Text size="medium" color="error" weight="medium" className="text-center">
            {error}
          </Text>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} size="large" required={true} className="w-full"/>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <Input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} size="large" required={true} className="w-full"/>
        </div>
        
        <div className="pt-2">
          <Button  type="submit"  title={loading ? 'Вход...' : 'Войти'}  color="primary"  size="large"  className="w-full" disabled={loading}/>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <Text size="medium" color="secondary" weight="normal">
          Ещё нет аккаунта?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Создать аккаунт
          </Link>
        </Text>
      </div>     
      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Забыли пароль?</Link>
      </div>
    </div>
  );
};

export default LoginPage;
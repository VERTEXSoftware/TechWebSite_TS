import React, { useState } from 'react';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input';
import { Text } from '../Components/Text';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

interface RegisterPageProps {
  onRegister: (user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin';
  }) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'user' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка регистрации');
      }

      const loginResponse = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const loginData = await loginResponse.json();
      
      if (!loginResponse.ok) {
        throw new Error(loginData.error || 'Ошибка авторизации после регистрации');
      }

      onRegister(loginData.user);
      navigate('/');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Text size="large" color="primary" weight="bold" className="text-center mb-6">
        Регистрация
      </Text>
      
      {error && (
        <Text size="medium" color="error" weight="medium" className="mb-4 text-center">
          {error}
        </Text>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} required/>
          </div>
          <div>
            <Input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} required/>
          </div>
        </div>
        <div>
          <Input type="tel" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} required/>
        </div>
        <div>
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div>
          <Input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required/>
        </div>
        <div>
          <label className="block mb-2">
            <Text size="medium" color="primary" weight="medium">Роль:</Text>
            <select name="role" value={formData.role} onChange={handleRoleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>
        <Button  type="submit"  title={loading ? 'Регистрация...' : 'Зарегистрироваться'}  color="secondary"  size="large"  className="w-full" disabled={loading}/>
      </form>    
      <div className="text-center mt-4">
        <Text size="medium" color="secondary" weight="normal">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default RegisterPage;
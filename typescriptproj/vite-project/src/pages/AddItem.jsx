import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Text } from '../components/Text';

function AddItem({ isOpen, onClose, onAddItem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price.trim()) {
      return;
    }
    if (isNaN(price)) {
      return;
    }

    onAddItem({ title, description, price });
    setTitle('');
    setDescription('');
    setPrice('');
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-lg w-full max-w-md">
        <Text size="large" color="primary" weight="bold" className="mb-4">Добавить новый товар</Text>
        <form onSubmit={handleSubmit}>
          <Input size="medium" color="primary" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)}className="mb-4"/>
          <Input size="medium" color="primary" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4"/>
          <Input size="medium" color="primary" placeholder="Цена" value={price} onChange={handlePriceChange} className="mb-4"/>
          <div className="flex justify-end">
            <Button type="submit" size="medium" color="secondary" title="Добавить" onClick={handleSubmit}/>
            <Button size="medium" color="primary" title="Закрыть" onClick={onClose} className="ml-2"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
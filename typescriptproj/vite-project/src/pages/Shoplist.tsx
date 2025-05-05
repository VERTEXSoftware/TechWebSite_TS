import React, { useEffect, useState } from 'react';
import Modal from '../Components/Modal';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Shoplist = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ 
    name: '', 
    price: 0, 
    quantity: 0 
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Не удалось загрузить продукты');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'name' ? value : Number(value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      setError('Все поля обязательны для заполнения');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Ошибка добавления');

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      setIsModalOpen(false);
      setNewProduct({ name: '', price: 0, quantity: 0 });
      setError(null);
    } catch (err) {
      setError('Ошибка при добавлении продукта');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Список продуктов</h2>  
      <Button title="Добавить продукт" color="secondary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: '20px' }}/>  
      {error && <div style={styles.error}>{error}</div>}

      {products.length > 0 ? (
        <ul style={styles.list}>
          {products.map(product => (
            <li key={product.id} style={styles.listItem}>
              <strong>{product.name}</strong> - 
              Цена: {product.price}р | 
              Количество: {product.quantity} | 
              Итого: {product.price * product.quantity}р
            </li>
          ))}
        </ul>
      ) : (
        <p>Продукты не найдены</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} title="Добавить новый продукт">
        <div style={styles.formGroup}>
          <label>Название:</label>
          <Input type="text" name="name" placeholder="Введите название продукта" value={newProduct.name} onChange={handleInputChange} color="primary"/>
        </div>
        <div style={styles.formGroup}>
          <label>Цена:</label>
          <Input type="number" name="price" placeholder="Введите цену" value={newProduct.price || ''} onChange={handleInputChange} min="0" color="primary"/>
        </div>
        <div style={styles.formGroup}>
          <label>Количество:</label>
          <Input type="number" name="quantity" placeholder="Введите количество" value={newProduct.quantity || ''} onChange={handleInputChange} min="0" color="primary"/>
        </div>
        <div style={styles.modalButtons}>
          <Button type="submit" title="Добавить" color="secondary" disabled={isSubmitting}/>
          <Button type="button" title="Отмена" color="primary" onClick={() => setIsModalOpen(false)}/>
        </div>
      </Modal>
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    color: '#333',
    marginBottom: '20px'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px'
  },
  error: {
    color: 'red',
    marginBottom: '15px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  }
} as const;


export default Shoplist;
import React, { useEffect, useState } from 'react';


interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const MyComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    
      <div>
        
        <h2>Список продуктов</h2>
        
        {products.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products.map(product => (
              <li key={product.id} style={{ marginBottom: '10px' }}>
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
      </div>
  
  );
};

export default MyComponent;
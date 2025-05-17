import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Modal from '../Components/Modal';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShoplistProps {
  user: {
    id: number;
    role: string;
  } | null;
}

const Shoplist: React.FC<ShoplistProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', price: 0, quantity: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    if (user) {
      fetchCart();
    }
  }, [user]);

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

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user?.id}`);
      if (!response.ok) throw new Error('Ошибка загрузки корзины');
      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError('Не удалось загрузить корзину');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'name' ? value : Number(value)
    });
  };

  const handleAddToCart = async (productId: number) => {
    if (!user) {
      setError('Для добавления в корзину необходимо авторизоваться');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user.id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) throw new Error('Ошибка добавления в корзину');

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError('Ошибка при добавлении в корзину');
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user?.id}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error('Ошибка удаления из корзины');

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError('Ошибка при удалении из корзины');
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${user?.id}/clear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка очистки корзины');

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError('Ошибка при очистке корзины');
    }
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

  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Список продуктов | Магазин</title>
        <meta name="description" content={`Управление продуктами: ${products.length} товаров на сумму ${totalValue}р`} />
        <meta property="og:title" content="Список продуктов магазина" />
        <meta property="og:description" content={`Всего товаров: ${totalItems} на сумму ${totalValue}р`} />
      </Helmet>

      <h2 style={styles.title}>Список продуктов</h2>
      <div style={styles.summary}>Всего товаров: {totalItems} | Общая стоимость: {totalValue}р</div>
      
      {user?.role === 'admin' && (<Button  title="Добавить продукт"  color="secondary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: '20px' }} />)}
      
      {error && <div style={styles.error}>{error}</div>}

      {products.length > 0 ? (
        <div style={styles.productsContainer}>
          <ul style={styles.list}>
            {products.map(product => (
              <li key={product.id} style={styles.listItem}>
                <strong>{product.name}</strong> - 
                Цена: {product.price}р | 
                Количество: {product.quantity} | 
                Итого: {product.price * product.quantity}р
                {user && (
                  <Button  title="В корзину"  color="primary"  onClick={() => handleAddToCart(product.id)}  style={{ marginLeft: '10px' }} size="small"/>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Продукты не найдены</p>
      )}

      {user && (
        <div style={styles.cartContainer}>
          <h3 style={styles.cartTitle}>Ваша корзина ({cartItemsCount} товаров)</h3>
          {cart.length > 0 ? (
            <>
              <ul style={styles.cartList}>
                {cart.map(item => (
                  <li key={item.productId} style={styles.cartItem}>
                    {item.name} - {item.price}р × {item.quantity} = {item.price * item.quantity}р
                    <Button title="Удалить" color="error"  onClick={() => handleRemoveFromCart(item.productId)}  style={{ marginLeft: '10px' }}size="small"/>
                  </li>
                ))}
              </ul>
              <div style={styles.cartTotal}>Итого: {cartTotal}р</div>
              <div style={styles.cartActions}>
                <Button  title="Очистить корзину"  color="secondary"  onClick={handleClearCart}/>
                <Button  title="Оформить заказ"  color="primary"  onClick={() => alert('Заказ оформлен!')} style={{ marginLeft: '10px' }}/>
              </div>
            </>
          ) : (
            <p>Ваша корзина пуста</p>
          )}
        </div>
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
  summary: {
    marginBottom: '20px',
    fontSize: '1.1em',
    fontWeight: 'bold'
  },
  productsContainer: {
    marginBottom: '40px'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cartContainer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px'
  },
  cartTitle: {
    marginBottom: '15px'
  },
  cartList: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '15px'
  },
  cartItem: {
    marginBottom: '8px',
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cartTotal: {
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginBottom: '15px'
  },
  cartActions: {
    display: 'flex',
    justifyContent: 'flex-end'
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
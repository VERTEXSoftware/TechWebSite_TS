import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let products = [];
let nextId = 1;

let users = [];
let carts = {};


function validatePhoneNumber(phone) {
  const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return phoneRegex.test(phone);
}


app.get('/api/products', (req, res) => {res.json(products);});

app.post('/api/products', (req, res) => {
  const { name, price, quantity } = req.body;
  
  if (!name || !price || !quantity) {
    return res.status(400).json({ error: 'Не все поля заполнены' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: Number(price),
    quantity: Number(quantity)
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});


app.post('/api/register', (req, res) => {
  const { firstName, lastName, phone, email, password, role } = req.body;
  
  if (!firstName || !lastName || !phone || !email || !password || !role) {return res.status(400).json({ error: 'Все поля обязательны для заполнения' });}
  if (!validatePhoneNumber(phone)) {return res.status(400).json({ error: 'Неверный формат номера телефона' });}
  if (users.some(user => user.email === email)) {return res.status(400).json({ error: 'Пользователь с таким email уже существует' });}
  if (users.some(user => user.phone === phone)) {return res.status(400).json({ error: 'Пользователь с таким номером телефона уже существует' });}

  const newUser = {
    id: nextId++,
    firstName,
    lastName,
    phone,
    email,
    password,
    role: role === 'admin' ? 'admin' : 'user'
  };
  
  users.push(newUser);

  carts[newUser.id] = [];
  res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {return res.status(400).json({ error: 'Email и пароль обязательны' });}

  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {return res.status(401).json({ error: 'Неверный email или пароль' });}

  res.json({ 
    message: 'Авторизация успешна',
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
  });
});


app.get('/api/cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  if (!carts[userId]) {
    carts[userId] = [];
  }
  res.json(carts[userId]);
});

app.post('/api/cart/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity) {return res.status(400).json({ error: 'Необходимо указать productId и quantity' });}

  if (!carts[userId]) {carts[userId] = [];}

  const product = products.find(p => p.id === productId);
  if (!product) {return res.status(404).json({ error: 'Продукт не найден' });}

  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({
      productId,
      quantity,
      name: product.name,
      price: product.price
    });
  }

  res.json(carts[userId]);
});

app.post('/api/cart/:userId/remove', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId } = req.body;
  
  if (!productId) {return res.status(400).json({ error: 'Необходимо указать productId' });}

  if (!carts[userId]) {return res.status(404).json({ error: 'Корзина не найдена' });}

  carts[userId] = carts[userId].filter(item => item.productId !== productId);
  res.json(carts[userId]);
});

app.post('/api/cart/:userId/clear', (req, res) => {
  const userId = parseInt(req.params.userId);
  carts[userId] = [];
  res.json(carts[userId]);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
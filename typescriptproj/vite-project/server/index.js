
import express from 'express';
import cors from 'cors';
import bodyParser  from 'body-parser';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let products = [];
let nextId = 1;


app.get('/api/products', (req, res) => {
  res.json(products);
});


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


app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
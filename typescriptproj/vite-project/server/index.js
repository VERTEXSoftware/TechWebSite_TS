import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const products = [
    { id: 1, name: 'Ноутбук', price: 100000, quantity: 5 },
    { id: 2, name: 'Смартфон', price: 80000, quantity: 10 },
    { id: 3, name: 'Наушники', price: 1500, quantity: 20 },
    { id: 4, name: 'Клавиатура', price: 1000, quantity: 15 },
];

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello world server!', title: 'test' });
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
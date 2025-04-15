import express from 'express'
import cors from 'cors'
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.get('/api/data', (req,res)=> {
    res.json({message: 'Hello world server!', title: 'test'});
});


app.listen(port,()=>{
console.log(`server is running at http://localhost:${port}`);
});
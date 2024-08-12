import express from 'express';
import numbersRouter from './routes/numbers';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 3000;

app.use('/numbers', numbersRouter);

app.get('/', (req, res) => {
    res.send('Calculator Microservice.');
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

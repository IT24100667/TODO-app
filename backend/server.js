const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT

// app.use(cors('https://todo-app-frontend-gray.vercel.app/'));

app.use(cors({
  origin: 'https://todo-app-frontend-gray.vercel.app'
}));


app.use(express.json());

app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Connection Failed ', err));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


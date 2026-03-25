const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectdb = require('./config/db');
const productroute = require('./routes/productroutes');
const authroutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

connectdb();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working');
});

app.use('/api/auth', authroutes);
app.use('/api/pro', productroute);

const port = process.env.PORT || 5600;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

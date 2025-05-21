require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const poolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    trustServerCertificate: true
  }
};

// Connect to database
sql.connect(poolConfig)
  .then(() => {
    console.log('Connected to database successfully');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

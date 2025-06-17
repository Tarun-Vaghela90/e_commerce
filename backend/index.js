const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user')
dotenv.config();
const path = require('path');

const app = express();


try {
  mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB Connected');
} catch (error) {
  console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1); // Exit the app if DB fails
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products/api', productRoutes);
app.use('/categories/api', categoryRoutes);
app.use('/user/api', userRoutes);


    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

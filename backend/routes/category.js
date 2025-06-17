const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// GET /api/categories - Get all product categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;

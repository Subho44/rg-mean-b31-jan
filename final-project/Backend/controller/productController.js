const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined || price === null) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Create product failed' });
  }
};

exports.allProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Fetch products failed' });
  }
};

exports.oneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Fetch product failed' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Update product failed' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete product failed' });
  }
};

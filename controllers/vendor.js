const Product = require('../models/Product'); // Adjust the path as needed

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, category, owner, price, image, description, countInStock, isFeatured } = req.body;

        const product = new Product({
            name,
            category,
            owner,
            price,
            image,
            description,
            countInStock,
            isFeatured,
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name') // Populate category with its name
            .populate('owner', 'name email') // Populate owner with name and email
            .populate('reviews'); // Populate reviews if needed

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('owner', 'name email')
            .populate('reviews');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { name, category, owner, price, image, description, countInStock, isFeatured } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, category, owner, price, image, description, countInStock, isFeatured },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
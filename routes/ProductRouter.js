const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

// add
router.post('/', (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then((item) => {
            return res.status(200).send({
                product_id: item.id,
                name: item.name,
                image: item.image,
                description: item.description,
                price: item.price,
                quantity: item.quantity
            });
        })
        .catch(err => {
            return res.status(500).send(err);
        });

})
// Get all products
router.get('/', (req, res) => {
    const list = Product.find().exec();
    list.then((items) => {
        return res.status(200).send(items.map(product => {
            return {
                product_id: product.id,
                name: product.name,
                image: product.image,
                description: product.description,
                price: product.price,
                quantity: product.quantity
            };
        }));
    })

        .catch(err => {
            return res.status(500).send(err);
        });


})
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('pages/index', { products: products });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
});
// Get detail
router.get('/:product_id', (req, res) => {
    Product.findById(req.params.product_id).then((product) => {
        return res.send(product);
    });
})
// delete products
// delete products
router.delete('/:product_id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.product_id).then((product) => {
        if (!product) {
            return res.status(404).send({
                message: 'Product not found'
            });
        }
        return res.status(200).send({
            message: 'Product deleted successfully'
        });
    }).catch((err) => {
        return res.status(500).send({
            message: 'Error deleting product'
        });
    });
});
// edit
router.put('/:product_id', (req, res) => {
    Product.findByIdAndUpdate(req.params.product_id, req.body, { new: true }).then((product) => {
        if (!product) {
            return res.status(404).send({
                message: 'Product not found'
            });
        }
        return res.status(200).send(product);
    }).catch((err) => {
        return res.status(500).send({
            message: 'Error updating product'
        });
    });
});
module.exports = router;
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/total-price', (req, res) => {
    Cart.findOne({ user: req.user._id }, (err, cart) => {
        if (err) {
            res.status(500).json({ message: 'Error finding cart', error: err });
        }
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        }
        cart.getTotalPrice()
            .then((totalPrice) => {
                res.json({ message: 'Cart total price', totalPrice });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error getting cart total price', error: err });
            });
    });
});

router.post('/checkout', (req, res) => {
    Cart.findOne({ user: req.user._id }, (err, cart) => {
        if (err) {
            res.status(500).json({ message: 'Error finding cart', error: err });
        }
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        }
        cart.checkout()
            .then((updatedCart) => {
                res.json({ message: 'Cart checked out', cart: updatedCart });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error checking out cart', error: err });
            });
    });
});

module.exports = router;
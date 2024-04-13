const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    username: { type: String, required: true },
    products: [
        {
            name: {
                type: String,
            },
            image: { type: String },
            quantity: {
                type: Number,
                default: 1,
            },
            price: { type: Number, default: 0 },
        },
    ]
});

module.exports = mongoose.model('Cart', cartSchema);
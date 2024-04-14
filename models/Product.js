const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    catname: { type: String, ref: 'Category' },
});

module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catname: { type: String },
});

module.exports = mongoose.model('Category', categorySchema);
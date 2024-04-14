const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const connectionString = 'mongodb://localhost:27017/ban_giay_schema';


mongoose.connect(connectionString).then(function () {
  console.log("conneted");
})

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.static('public'));

const userRoutes = require('./routes/UserRouter');
const productRoutes = require('./routes/ProductRouter');
const categoryRoutes = require('./routes/CategoryRouter');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);


app.listen(3000, () => {
  console.log('Server đang chạy!!');
});

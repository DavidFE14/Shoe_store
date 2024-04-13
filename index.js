const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const connectionString = 'mongodb://localhost:27017/ban_giay_schema';
// tailwindcss
app.use("/css", express.static("dist"));

mongoose.connect(connectionString).then(function () {
  console.log("conneted");
})

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// page
app.get('/', function (req, res) {
  res.render('pages/index');
});
app.get('/cart', function (req, res) {
  res.render('pages/cart');
});


const userRoutes = require('./routes/UserRouter');
const productRoutes = require('./routes/ProductRouter');
const cartRoutes = require('./routes/CartRouter');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


app.listen(3000, () => {
  console.log('Server đang chạy!!');
});

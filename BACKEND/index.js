const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const routesuser = require('./routes/user');
const routescategory = require('./routes/category');
const routesproduct = require('./routes/product');
const billroutes = require('./routes/bill');
const dashboardroute = require('./routes/dashboard');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', routesuser);
app.use('/category', routescategory);
app.use('/product', routesproduct);
app.use('/bill', billroutes);
app.use('/dashboard', dashboardroute);

module.exports = app;
const express = require('express');
const morgan = require('morgan');

const hostelRouter = require('./routes/hostelRoutes');
const hostelerRouter = require('./routes/hostelerRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();

//Middleware for logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/hostels', hostelRouter);
app.use('/api/v1/hostelers', hostelerRouter);
app.use('/api/v1/admin', adminRouter);
module.exports = app;

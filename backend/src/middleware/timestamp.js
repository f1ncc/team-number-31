const app = require('./../app');

app.use((req, res, next) => {
  req.timestamp = new Date().toISOString();
  next();
});

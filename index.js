const express = require('express');
const db = require('./database');
const productRoute = require('./routes/products')

const app = express();

app.use("/products", productRoute)

app.get("/", (req, res) => {
  res.send('Hello')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000')
})

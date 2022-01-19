const express = require('express');
const db = require('./database');
const productRoute = require('./routes/products')
// require('newrelic');
const PORT = process.env.PORT || 3000;

const app = express();

app.use("/products", productRoute)

app.get("/", (req, res) => {
  const data = `App running at PORT ${PORT}`
  res.send(data)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

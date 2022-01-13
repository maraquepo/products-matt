const router = require('express').Router();
const connection = require('./../database')

router.get('/', (req,res) => {
  let queryStr = `SELECT * FROM products LIMIT 5`
  connection.query(queryStr, (err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.send(data.rows)
    }
    connection.end;
  })
})

router.get('/:id', (req,res) => {

  let id = req.params.id;
  let params = [id]
  let queryStr = `
  SELECT
    products.id,
    products.name,
    products.slogan,
    products.description,
    products.category,
    products.default_price,

    jsonb_agg(jsonb_build_object(
      'features', features.feature,
      'value', features.value
    )) as features

  FROM products
  LEFT OUTER JOIN features
  ON products.id = features.productid
  WHERE products.id = $1
  GROUP BY products.id
  `

  connection.query(queryStr, params, (err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.send(data.rows)
    }
    connection.end;
  })
})


router.get('/:id/related', (req,res) => {

  let id = req.params.id;
  let params = [id]
  let queryStr = `SELECT ARRAY_AGG(related_product_id) FROM related WHERE current_product_id = $1`

  connection.query(queryStr, params, (err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.send(data.rows[0].array_agg)
    }
    connection.end;
  })
})

router.get('/:id/styles', (req,res) => {

  let id = req.params.id;
  let params = [id]
  let queryStr = `SELECT * FROM related WHERE current_product_id = $1`

  connection.query(queryStr, params, (err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.send(data.rows)
    }
    connection.end;
  })
})

module.exports = router;
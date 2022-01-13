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
  let queryStr = `
    SELECT ARRAY_AGG(related_product_id)
    FROM related
    WHERE current_product_id = $1`

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
  let queryStr = `
    -- includes styles.productId with alias product_id to obj
    SELECT styles.productId as product_id,

    -- includes results to obj
    -- aggregates the resultExpression into the result key's value
    (SELECT jsonb_agg(resultExpression)
      FROM (
        SELECT
          -- grab id, name, sale_price, original_price, and default_style from styles table
          styles.id as style_id,
          styles.name,
          styles.sale_price,
          styles.original_price,
          styles.default_style,

          -- includes photos to obj
          -- aggregates the photosExpression into the photo key's value
          (SELECT jsonb_agg(photosExpression)
            FROM (
              SELECT
                --grab thumbnail_url and url from photos table that has matching styleId to the style id of the current product
                photos.thumbnail_url,
                photos.url
              FROM photos
              WHERE photos.styleId = styles.id
              GROUP BY photos.thumbnail_url, photos.url
            -- alias for the expression above
            ) AS photosExpression
          -- alias for the key
          ) AS photos,

          -- includes skus to obj
          -- aggregates the skusExpression into the skus key's value
          (SELECT jsonb_agg(skusExpression)
            FROM (
              SELECT
                -- grab size and quantity from skus table with matching styleId to the style id of the current product
                skus.size,
                skus.quantity
              FROM skus
              WHERE skus.styleId = styles.id
              GROUP BY skus.size, skus.quantity
            -- alias for the expression above
            ) AS skusExpression
          -- alias for the key, from styles table where productId is equal to the input id value
          ) AS skus FROM styles WHERE styles.productId = $1 GROUP BY styles.id

      -- alias for the whole result expression
      ) AS resultExpression
    -- alias for the key, from styles table where productId is equal to the input id value
    ) AS results FROM styles WHERE styles.productId = $1
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

module.exports = router;

// includes styles.productID with alias product_id to obj
SELECT styles.productId as product_id,

// includes results to obj
(SELECT jsonb_agg(styles)
  // from styles we grab id, name, sale_price, original_price, and default_style
  FROM (
    SELECT
      styles.id as style_id,
      styles.name,
      styles.sale_price,
      styles.original_price,
      styles.default_style,

      // PHOTOS
      // includes photos to results obj
      // aggregates the photosObj expression
      (SELECT jsonb_agg(photosObj)
        FROM (
          SELECT
            photos.thumbnail_url,
            photos.url
          FROM photos
          WHERE photos.styleId = styles.id
          GROUP BY photos.thumbnail_url, photos.url
        // gives name to the expression
        ) AS photosObj
      // names they key as results
      ) AS photos,

      // SKUS
      // includes skus to results obj
      // aggregates the skusObj
      (SELECT jsonb_agg(skusObj)
        FROM (
          SELECT
            skus.size,
            skus.quantity
          FROM skus
          WHERE skus.styleId = styles.id
          GROUP BY skus.size, skus.quantity
        ) AS skusObj
      ) AS skus FROM styles WHERE styles.productId = $1 GROUP BY styles.id

  ) AS styles
) AS results FROM styles WHERE styles.productID = $1
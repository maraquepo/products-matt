CREATE DATABASE productsapi;

CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(500),
  description VARCHAR(1000),
  category VARCHAR(100),
  default_price VARCHAR(50)
);

CREATE TABLE styles (
  id BIGSERIAL PRIMARY KEY,
  productId INT NOT NULL,
  name VARCHAR(100),
  sale_price VARCHAR(50) NULL,
  original_price VARCHAR(50) NOT NULL,
  default_style boolean NOT NULL,
  FOREIGN KEY(productId)
    REFERENCES products(id)
    ON DELETE CASCADE
);

CREATE TABLE features (
  id BIGSERIAL PRIMARY KEY,
  productId INT NOT NULL,
  feature VARCHAR(100),
  value VARCHAR(100),
  FOREIGN KEY(productId)
    REFERENCES products(id)
    ON DELETE CASCADE
);

CREATE TABLE related (
  id BIGSERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY(current_product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

CREATE TABLE photos (
  id BIGSERIAL NOT NULL,
  styleId INT NOT NULL,
  thumbnail_url VARCHAR(100000),
  url VARCHAR(100000),
  FOREIGN KEY (styleId)
    REFERENCES styles(id)
    ON DELETE CASCADE
);

CREATE TABLE skus (
  id BIGSERIAL PRIMARY KEY,
  styleID INT NOT NULL,
  size VARCHAR(25),
  quantity INT NOT NULL,
  FOREIGN KEY(styleID)
    REFERENCES styles(id)
    ON DELETE CASCADE
);

COPY products(id, name, slogan, description, category, default_price)
FROM '/Volumes/mattsusb/SDC/product.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Volumes/mattsusb/SDC/styles.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, productId, feature, value)
FROM '/Volumes/mattsusb/SDC/features.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Volumes/mattsusb/SDC/related.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleID, thumbnail_url, url)
FROM '/Volumes/mattsusb/SDC/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleID, size, quantity)
FROM '/Volumes/mattsusb/SDC/skus.csv'
DELIMITER ','
CSV HEADER;

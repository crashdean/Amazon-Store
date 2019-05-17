DROP DATABASE IF EXISTS amazon_storeDB;

CREATE DATABASE amazon_storeDB;

USE amazon_storeDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hammock", "camping", 45, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tent", "camping", 100, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cooking stove", "camping", 120, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tires", "automotive", 125, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mufflers", "automotive", 140, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("soccer ball", "sporting", 27, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("basketball", "sporting", 29, 170);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lamp", "household", 25, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rug", "household", 75, 51);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chair", "household", 68, 12);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
item_id integer (10) not null,
product_name varchar (50),
department_name varchar (50),
price decimal (10, 2) null,
stock_quantity int null
);


insert into products (item_id, product_name, department_name, price, stock_quantity)
values (17, "Permanent Whiteboard Markers", "Home and Household", 9.99, 75);

update products set product_name = "Phose Headphones" where product_name = "Fose Headphones";

SET SQL_SAFE_UPDATES = 0;

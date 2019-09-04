drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
id integer (10) auto_increment not null,
product_name varchar (50),
department_name varchar (50),
price decimal (10, 2) null,
stock_quantity int null
);




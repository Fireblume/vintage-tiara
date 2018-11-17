CREATE TABLE ROLES (
	ID int NOT NULL IDENTITY(1,1),
	TYPE varchar(10) NOT NULL UNIQUE, 
	PRIMARY KEY (ID)
);

CREATE TABLE USERS (
  ID int NOT NULL IDENTITY(1,1), 
  ROLEID int NOT NULL,
  UID varchar(100) not null unique,
  FULL_NAME varchar(50) NOT NULL, 
  EMAIL varchar(50) NOT NULL UNIQUE,
  PHONE varchar(10),
  BIRTHDAY date,
  ADDRESS varchar(50),
  CITYID int,
  COUNTRYID int,
  PRIMARY KEY (ID),
  FOREIGN KEY (ROLEID) REFERENCES ROLES(ID)
);

CREATE TABLE COUNTRIES(
	ID int NOT NULL IDENTITY(1,1),
	NAME varchar(30) NOT NULL UNIQUE,
	ACTIVE varchar(1) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE CITIES(
	ID int NOT NULL IDENTITY(1,1),
	NAME varchar(30) NOT NULL UNIQUE,
	CODE int NOT NULL UNIQUE,
	ACTIVE varchar(1) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE CATEGORIES(
	ID int NOT NULL IDENTITY(1,1),
	TITLE varchar(30) NOT NULL UNIQUE,
	ACTIVE varchar(1) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE SUBCATEGORIES(
	ID int NOT NULL IDENTITY(1,1),
	CATEGORYID int NOT NULL,
	TITLE varchar(30) NOT NULL UNIQUE,
	ACTIVE varchar(1) NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (CATEGORYID) REFERENCES CATEGORIES(ID)
);

CREATE TABLE PRODUCTS (
	ID int NOT NULL IDENTITY(1,1),
	SUBCATEGORYID int NOT NULL,
	TITLE varchar(30) NOT NULL,
	DESCRIPTION varchar(100),
	QUANTITY int NOT NULL,
	PHOTO nvarchar(max) NOT NULL,
	PRICE varchar(10) NOT NULL,
	ACTIVE varchar(1) NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (SUBCATEGORYID) REFERENCES SUBCATEGORIES(ID)
);

CREATE TABLE CART (
	ID int NOT NULL IDENTITY(1,1),
	PRODUCTID int NOT NULL,
	UID varchar(100) not null,
	QUANTITY int NOT NULL,
	ACTIVE varchar(1),
	ADDEDON date,
	PRIMARY KEY (ID),
	FOREIGN KEY (PRODUCTID) REFERENCES PRODUCTS(ID)
);

CREATE TABLE LIKES (
	ID int NOT NULL IDENTITY(1,1),
	PRODUCTID int NOT NULL,
	UID varchar(100) not null,
	ADDEDON date,
	PRIMARY KEY (ID),
	FOREIGN KEY (PRODUCTID) REFERENCES PRODUCTS(ID)
);

CREATE TABLE ORDERS (
	ID int NOT NULL IDENTITY(1,1),
	CARTID int NOT NULL,
	PAID varchar(1),
	SHIPED varchar(1),
	ACCEPTED varchar(1),
	CREATEDON date,
	PAIDON date,
	ACCEPTEDON date,
	SHIPEDON date,
	PRIMARY KEY (ID),
	FOREIGN KEY (CARTID) REFERENCES CART(ID)
);

alter table users
add UID varchar(50) not null unique

drop table orders
drop table LIKES
drop table CART
drop table PRODUCTS
drop table SUBCATEGORIES
drop table CATEGORIES
drop table CITIES
drop table COUNTRIES
drop table USERS
drop table ROLES
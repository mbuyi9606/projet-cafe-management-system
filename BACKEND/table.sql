create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(225),
    contactnumber varchar(20),
    email varchar(200),
    password varchar(200),
    status varchar(20),
    role varchar(50),
    UNIQUE(email)
)

insert into user(name,contactnumber,email,password,status,role) values ('developer','22222555','jonathandiana','CHRIST','true','admin');

create table category(
    id int NULL AUTO_INCREMENT,
    name varchar(255),
    primary key(id)
);

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key (id)
);

create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactnumber varchar (200) NOT NULL,
    paymentMetthod varchar(250) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createdBy varchar(200) NOT NULL,
    primary key (id)
);
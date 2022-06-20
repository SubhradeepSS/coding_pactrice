-- tested manually not in hackerrank exam
-- find the country names and their avg invoice where their avg invoice
-- is greater than the avg of all invoices

drop database if exists db;

create database db;
use db;

create table country (
    id int,
    name text
);
insert into country values (1, 'a');
insert into country values (2, 'b');
insert into country values (3, 'c');

create table city (
    country_id int,
    id int
);
insert into city values (1, 1);
insert into city values (1, 2);
insert into city values (2, 3);
insert into city values (2, 4);
insert into city values (3, 5);

create table customer (
    id int,
    city_id int
);
insert into customer values (1, 1); 
insert into customer values (2, 1);
insert into customer values (3, 5);
insert into customer values (4, 3);
insert into customer values (5, 4);

create table invoice (
    customer_id int,
    total_price int
);
insert into invoice values (1, 1000);
insert into invoice values (2, 100);
insert into invoice values (3, 600);
insert into invoice values (4, 5000);
insert into invoice values (5, 29);


SELECT c.name, a.cont_avg from country c
inner join (
    SELECT x.cont as cont_id, avg(x.pri) as cont_avg FROM (
        SELECT s.total_price as pri, cu.country_id as cont FROM invoice s
        INNER JOIN 
        customer AS ci ON ci.id = s.customer_id
        INNER JOIN 
        city cu ON cu.id = ci.city_id
    ) 
        x GROUP BY x.cont
) a on c.id=a.cont_id 
where a.cont_avg > (SELECT avg(total_price) from invoice);
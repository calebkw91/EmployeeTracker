DROP DATABASE IF EXISTS employees_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employees_db;

USE employees_db;

-- Create the table tasks.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  dpname VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE emp_role (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (dpname)
VALUES ('Sales'),
       ('Engineering'),
       ('Financial'),
       ('Legal');
       
INSERT INTO emp_role (title, salary, department_id)
VALUES ('Sales Lead', '100000', 1),
	   ('Salesperson', '80000', 1),
       ('Lead Engineer', '150000', 2),
       ('Software Engineer', '120000', 2),
       ('Accountant', '125000', 3),
       ('Legal Team Lead', '250000', 4),
       ('Lawyer', '190000', 4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 3),
	   ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriquez', 3, null),
       ('Kevin', 'Tupik', 4, 3),
       ('Malia', 'Brown', 5, null),
       ('Sarah', 'Lourd', 6, null),
       ('Tom', 'Allen', 7, 7),
       ('Tammer', 'Galal', 4, 6);
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  dept_id INT,
  PRIMARY KEY (id)
);

SELECT dept_name FROM departments;

CREATE TABLE employees (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees; 

INSERT INTO departments (dept_name)
VALUES 
-- marketing --
("Marketing"), 
-- it --
("IT"), 
-- hr --
("Human Resources");

INSERT INTO roles (title, salary, dept_id)
VALUES 
-- marketing --
("Marketing Manager", 60000.00, 1), 
("Graphic Designer", 40000.00, 1), 
-- it --
("IT Head", 100000.00, 2),
("Developer", 60000.00, 2),
-- hr --
("HR Manager", 70000.00, 3),
("HR Worker", 50000.00, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES 
-- marketing --
("Miike", "Snow", "1"), 
("Yeast", "Ken", "2"),
-- it --
("David", "Byrne", "3"),
("Skylar", "Spence", "4"),
-- hr --
("Kishi", "Bashi", "5"), 
("Andrew", "Bird", "6");

SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name 
FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.dept_id=departments.id;

SELECT dept_name FROM departments;

INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)
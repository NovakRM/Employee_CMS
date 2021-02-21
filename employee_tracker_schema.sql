DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
  id INT NOT NULL auto_increment,
  dept_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  dept_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_department FOREIGN KEY (dept_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_manager FOREIGN KEY (role_id) REFERENCES roles(id)
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees; 

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

SELECT * FROM departments;

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(8,2), -- 8 numbers total, 2 after dec, up to 6-fig salary --
    department_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (department_id) REFERENCES departments(id)
);

SELECT * FROM roles;

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES roles(id)
);

SELECT * FROM employees;
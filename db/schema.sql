DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

-- DEPT Table
CREATE TABLE department(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Roles Table
CREATE TABLE roles(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER
);

-- Employee Table
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER
);
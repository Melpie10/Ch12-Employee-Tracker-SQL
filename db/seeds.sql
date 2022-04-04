SOURCE db/schema.sql;

-- TABLE VALUES DEPT
INSERT INTO department (department_name)
VALUES
    ("imagineering"),
    ("park operations");

-- TABLE VALUES ROLES
INSERT INTO roles (title, salary, department_id)
VALUES
    ("imagineer", 80000, 1),
    ("park cast", 80000, 2);

-- TABLE VALUES EMPLOYEE
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Mickey", "Mouse", 1, NULL),
    ("Snow", "White", 2, 1);

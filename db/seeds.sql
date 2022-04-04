
-- Table Values: Depts 
INSERT INTO department (name)
VALUES
    ("Imagineers"), 
    ("Park Operations"); 

-- Table Values: Roles 
INSERT INTO  role (title, salary, department_id)
VALUES
    ("Disney-Park Character", 42000, 1),
    ("Drawing Artist", 35500, 1);


-- Table Values: Employees 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Mickey", "Mouse", 1, NULL),
    ("Snow", "White", 2, 1);
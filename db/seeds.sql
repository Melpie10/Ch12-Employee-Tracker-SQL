SOURCE db/schema.sql;

-- Table Values: Depts 
INSERT INTO departments (department_name)
VALUES
    ("Office Administration"), 
    ("Human Resources"), 
    ("Disney Talent"), 
    ("Imageneers"), 
    ("Accounting"), 
    ("Park Operations"); 

-- Table Values: Roles 
INSERT INTO roles (title, salary, department_id)
VALUES
    ("Disney-Park Character", 25000, 3),
    ("Makeup Artist", 30000, 4),
    ("Choreographer", 40000, 4),
    ("Park Manager", 90000, 6),
    ("Cleaning Crew", 23000, 6),
    ("HR Director", 50000, 2),
    ("Call Center Rep", 40000, 1),
    ("Customer Service Supervisor", 43000, 1),
    ("Customer Service", 37000, 1),
    ("Accountant", 70000, 5),
    ("Drawing Artist", 65000, 4);


-- Table Values: Employees 
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Lilo", "Stitch", 13, 23),
    ("Snow", "White", 14, 17),
    ("Sleeping", "Beauty", 12, 15),
    ("Prince", "Charming", 9, 23),
    ("Captain", "Hook", 15, 23),
    ("Mickey", "Mouse", 1, NULL);


-- Add mana Foreign Key AFTER  Employees table so  Foreign Key can reference PK in same table
-- ALTER TABLE employees ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id);
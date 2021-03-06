const db = require("../db/connection");
const inquirer = require("inquirer");

// View Employees table: employee id, first name, last name, role, dept, manager
const staffTable = () => {
    const promptApp = require("../src/promptLogic");

    const sql = `
    SELECT staff.id, staff.first_name, staff.last_name, roles.title AS role, department.department_name AS department, managers.first_name AS manager
    FROM employee AS staff
    LEFT JOIN roles
    ON staff.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id
    LEFT JOIN employee AS managers
    ON staff.manager_id = managers.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        promptApp();
    });
};


// Add employee: enter first & last name, role, manager
const newStaff = (roleArr, empArr) => {
    const promptApp = require("../src/promptLogic");

    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "New employee first name:",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter employee first name!");
                    }
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "New employee last name:",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter employee last name!");
                    }
                }
            },
            {
                type: "list",
                name: "role",
                message: "New employee title:",
                choices: roleArr
            },
            {
                type: "list",
                name: "mgr",
                message: "New employee's manager:",
                choices: empArr
            }
        ])
        .then(answers => {
            const fName = answers.firstName;
            const lName = answers.lastName;
            const role = answers.role;
            const mgr = answers.mgr;

            empArr.push(fName);

            const sql = `
                INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUES(?, ?,
                    (SELECT id FROM roles WHERE title = ?),
                    (SELECT emp.id FROM employee AS emp WHERE emp.first_name = ?))`;
            db.query(sql, [fName, lName, role, mgr], (err, result) => {
                if (err) { throw err; };
            });
            db.query(`SELECT id, first_name, last_name FROM employee`, (err, rows) => {
                if (err) { throw err; };
                console.table(rows);
                console.log(`New employee ${fName} ${lName} has been added!`);
                promptApp();
            });
        });
};

//  select employee and update role
const updateEmp = (roleArr, empArr) => {
    const promptApp = require("../src/promptLogic");

    inquirer
        .prompt([
            {
                type: "list",
                name: "emp",
                message: "Employee to update:",
                choices: empArr
            },
            {
                type: "list",
                name: "role",
                message: "Employee's new title:",
                choices: roleArr
            }
        ])
        .then(answers => {
            let role = answers.role;
            let emp = answers.emp;

            const sql = `
                UPDATE employee
                SET role_id = (SELECT id FROM roles WHERE title = ?) 
                WHERE first_name = ?`;
            db.query(sql, [role, emp], (err, result) => {
                if (err) { throw err; };
                console.log(`${emp}'s role has been updated to ${role};`);
            });
            const sql2 = `
                SELECT employee.id, employee.first_name, employee.last_name, roles.title
                FROM employee
                LEFT JOIN roles
                ON employee.role_id = roles.id
                WHERE employee.first_name = ?;`
            db.query(sql2, emp, (err, rows) => {
                if (err) { throw err; };
                console.table(rows);
                promptApp();
            });
        });
};

module.exports = [staffTable, newStaff, updateEmp];
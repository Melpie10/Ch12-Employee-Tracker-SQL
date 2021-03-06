const inquirer = require("inquirer");
const db = require("../db/connection");
const [deptsTable, newDept] = require("../queries/departmentQueries");
const [rolesTable, newRole] = require("../queries/rolesQueries");
const [staffTable, newStaff, updateEmp] = require("../queries/employeesQueries");

var figlet = require('figlet');

figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

function promptApp() {
    let deptArr = [];
    let empArr = [];
    let roleArr = [];

    //  Select department
    db.query(`SELECT department_name FROM department`, (err, res) => {
      console.log(res);  
      for (let i = 0; i < res.length; i++) {
            let dept = res[i].department_name;
            deptArr.push(dept);
        }
    });

    //  select employee
    db.query(`SELECT first_name FROM employee`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            let emp = res[i].first_name;
            empArr.push(emp);
        }
    });

    // select role
    db.query(`SELECT title FROM roles`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            let role = res[i].title;
            roleArr.push(role);
        }
    });
    inquirer
        .prompt([
            {
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
            }
        ])
        .then(answer => {
            switch (answer.mainMenu) {
                case "View All Departments":
                    deptsTable();
                    break;
                case "View All Roles":
                    rolesTable();
                    break;
                case "View All Employees":
                    staffTable();
                    break;
                case "Add Department":
                    newDept(deptArr);
                    break;
                case "Add Role":
                    newRole(deptArr, roleArr);
                    break;
                case "Add Employee":
                    newStaff(roleArr, empArr);
                    break;
                case "Update Employee Role":
                    updateEmp(roleArr, empArr);
                    break;
            }
        });
};

module.exports = promptApp;
const db = require('./connection');
const inquirer = require('inquirer');
require('console.table');

function startApp() {
    
    inquirer
    .prompt([
        
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 
            'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ])
        .then(userChoice => {
            
            switch (userChoice.menu) {
                case "View All Employees":

                    allEmploys();
                 
                    break;

                case "Add Employee":
                    addEmployee;
                    break;

                case "Update Employee Role":
                    
                    
                    break;

                case "View All Roles":
                    allEmployRoles();
                   
                    break;

                case "Add Role":
                    addRole;
                    break;

                case "View All Departments":
                   
                    allDepts();
                 
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Quit":
            }
        })
}
function allEmploys() {
    console.clear();
    console.log('\n')
    console.log("--- Browsing All Employees ---")
    console.log('\n')

    let sql1 = `SELECT employee.id AS "ID",
                    employee.first_name AS "First Name",
                    employee.last_name AS "Last Name",
                    emp_role.title AS "Title",
                    department.dept_name AS "Department",
                    emp_role.salary AS "Salary"

                FROM employee
                JOIN emp_role ON employee.role_id = emp_role.id
                JOIN department ON emp_role.dept_id = department.id`

    db.query(sql1, (err, results) => {
        console.table(results);
        startApp();
    });
}

function allEmployRoles() {
    console.clear();
    console.log('\n')
    console.log("--- Browsing All Employee Roles ---")
    console.log('\n')

    db.query('SELECT * FROM emp_role', function (err, results) {
        console.table(results);
        startApp();
    });
}

function allDepts() {
    console.clear();
    console.log('\n')
    console.log("--- Browsing All Departments ---")
    console.log('\n')

    db.query('SELECT * FROM department', function (err, results) {
        console.table(results)
        startApp();
    });
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of your employee?'
        },

        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of your employee?'
        },

        {
            type: 'input',
            name: 'roleID',
            message: 'What is the role id of the employee?'
        },

        {
            type: 'input',
            name: 'managerID',
            message: 'What is the manager id of the employee?'
        }
    ]).then(answers => {
        // const newEmployee = `INSERT INTO employee (answers.firstName, answers.lastName, answers.roleID, answers.managerID)`;
        // db.query(newEmployee, (err, rows) => {
        //     if (err) {
        //         res.status(500).json({ error: err.message });
        //          return;
        //       }
        //       res.json({
        //         message: 'success',

        //       });
        // })
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the new department?'
        }
    ]).then(answers => {
        db.query(`INSERT INTO department (name) Values (?)`, answers.deptName, (err, res) => {
            startApp();
        })
    })
}

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the new role?'
        }
    ]).then(answers => {
        db.query(`INSERT INTO emp_role (title) Values (?)`, answers.roleName, (err, res) => {
            startApp();
        })
    })
}


module.exports = {
    startApp
  
}
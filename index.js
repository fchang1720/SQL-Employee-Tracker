const inquirer = require('inquirer');
require('dotenv').config();
const {db} = require('./connection')
const { allDepts, allEmploys, allEmployRoles } = require('./queryFunctions')

// const opt = ["ALL_DEPT", "ALL_ROLES"];
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
                    allEmploys;
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    break;

                case "View All Roles":
                    allEmployRoles;
                    break;

                case "Add Role":
                    break;

                case "View All Departments":
                    // queryFunctions.allDepts();
                    allDepts;
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Quit":
            }
        })
}

// Banner that is displayed once index.js is initialized. Created using text art generator online.
console.log(`
 __________________________________________________________________________
|                                                                          |
|   ███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗   |
|   ██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝   |
|   █████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░   |
|   ██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░   |
|   ███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗   |
|   ╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝   |
|                                                                          |
|       ████████╗██████╗░░█████╗░░█████╗░██╗░░██╗███████╗██████╗░          |
|       ╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝██╔══██╗          |
|       ░░░██║░░░██████╔╝███████║██║░░╚═╝█████═╝░█████╗░░██████╔╝          |
|       ░░░██║░░░██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██╔══██╗          |
|       ░░░██║░░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗██║░░██║          |
|       ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝          |
|__________________________________________________________________________|

`);
startApp();

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

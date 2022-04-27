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
                    addEmployee();
                    break;

                case "Update Employee Role":
                    
                    updateRole();
                    break;

                case "View All Roles":
                    allEmployRoles();
                   
                    break;

                case "Add Role":
                    addRole();
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
                    emp_role.salary AS "Salary",
                    CONCAT(manager.first_name, ' ', manager.last_name) AS manager

                FROM employee
                JOIN emp_role ON employee.role_id = emp_role.id
                JOIN department ON emp_role.dept_id = department.id
                LEFT JOIN employee manager
                ON manager.id = employee.manager_id
                ORDER BY employee.id`

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

    let sql2 = `SELECT emp_role.id AS "ID",
                    emp_role.title AS "Title",
                    emp_role.salary AS "Salary",
                    department.dept_name AS "Department"
                
                FROM emp_role
                JOIN department ON emp_role.dept_id = department.id
                ORDER BY emp_role.id`
    db.query(sql2, (err, results) => {
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
    console.clear();
    console.log('\n')
    console.log("--- Adding New Employee ---")
    console.log('\n')


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
        const newEmployee = `INSERT INTO employee SET ?`;
        db.query(newEmployee, {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.roleID,
                manager_id: answers.managerID},
                (err, res) => {
                    if (err) throw err;
                    console.log('\n');
                    console.log("--- Employee Successfully Added! ---");
                    console.log('\n');
                startApp();

        })
    })
}

function updateRole() {
    
    const sql3 = `SELECT id,
                    first_name,
                    last_name
                FROM employee`
    db.query(sql3, (err,res) => {
        if (err) throw err;
        const employeeInfo = res.map(({id, first_name, last_name}) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }));
        chooseRole(employeeInfo);
    });
}

function chooseRole(employeeInfo) {
    const sql4 = `SELECT id, 
                    title
                FROM emp_role`
    db.query(sql4, (err,res) => {
        if (err) throw err;
        let roleOptions = res.map(({id, title}) => ({
            value: id,
            title: `${title}`
        }));
        finishUpdate(employeeInfo, roleOptions);
    });

}

function finishUpdate(employeeInfo, roleOptions) {
    console.clear();
    console.log('\n')
    console.log("--- Adding New Employee ---")
    console.log('\n')
    
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: 'What is the name of the employee that will update roles?',
            choices: employeeInfo
        },
        {
            type: 'list',
            name: 'roleID',
            message: 'What is the new role id?',
            choices: roleOptions
        },
    ]).then((res) => {
        let sql5 = `UPDATE employee SET role_id = ? WHERE id = ?`
        db.query(sql5,[res.roleID, res.employeeName], (err, res) => {
            if(err) throw err;
            startApp();
        })
    })
}


function addDepartment() {
    console.clear();
    console.log('\n')
    console.log("--- Adding New Department ---")
    console.log('\n')
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the name of the new department?'
        }
    ]).then(answers => {
        const newDept = `INSERT INTO department SET ?`
        db.query(newDept, {
            dept_name: answers.deptName},
            (err, res) => {
                if (err) throw err;
                console.log('\n');
                console.log("--- New Department Successfully Added! ---");
                console.log('\n');
            startApp();
        })
    })
}

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'input',
            name: 'deptID',
            message: 'What is the department id of the new role?'
        }

    ]).then(answers => {
        const newRole = `INSERT INTO emp_role SET ?`
        db.query(newRole, {
            title: answers.title,
            salary: answers.salary,
            dept_id: answers.deptID},
            (err, res) => {
                if (err) throw err;
                console.log('\n');
                console.log("--- New Role Successfully Added! ---");
                console.log('\n');
            startApp();
            
        })
    })
}


module.exports = {
    startApp
  
}
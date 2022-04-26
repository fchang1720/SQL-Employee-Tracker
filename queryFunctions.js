const db = require('./connection');
require('console.table');

function allEmploys() {
    
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
        
    });
}

function allEmployRoles() {
    
    console.log('\n')
    console.log("--- Browsing All Employee Roles ---")
    console.log('\n')

    db.query('SELECT * FROM emp_role', function (err, results) {
        console.table(results);
        
    });
}

function allDepts() {
    
    console.log('\n')
    console.log("--- Browsing All Departments ---")
    console.log('\n')

    db.query('SELECT * FROM department', function (err, results) {
        console.table(results)
        
    });
}



module.exports = {
    allDepts,
    allEmploys,
    allEmployRoles,
  
}
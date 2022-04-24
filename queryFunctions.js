const {db} = require('./connection')
const mysql = require('mysql2');
function allEmploys() {
    
    let sql1 = `SELECT employee.id AS "ID",
                    employee.first_name AS "First Name",
                    employee.last_name AS "Last Name",
                    emp_role.title AS "Title",
                    department.dept_name AS "Department",
                    emp_role.salary AS "Salary"

                FROM employee
                JOIN emp_role ON employee.role_id = emp_role.id
                JOIN department ON emp_role.dept_id = department.id;`

    db.query(sql1, (err, results) => {
                if (err) {
                    throw err
                }
                console.log(results)
            startApp();
    });
}

function allEmployRoles() {
    db.query('SELECT * FROM emp_role;', function (err, results) {
        startApp();
    });
}

function allDepts() {
    db.query("SELECT * FROM department;", function (err, res) {
        if (err) {
            throw err
        }
        console.log(res);
        startApp();
    });
}



module.exports = {
    allDepts,
    allEmploys,
    allEmployRoles
    // allDepts : allDepts
}
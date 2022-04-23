const db = require('./connection')

function allEmploys() {
    db.query('SELECT * FROM employee', function (err, results) {
        startApp();
    });
}

function allEmployRoles() {
    db.query('SELECT * FROM emp_role', function (err, results) {
        startApp();
    });
}

function allDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        startApp();
    });
}



module.exports = {
    allDepts,
    allEmploys,
    allEmployRoles
    // allDepts : allDepts
}
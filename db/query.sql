SELECT employee.id AS "ID",
       employee.first_name AS "First Name",
       employee.last_name AS "Last Name",
       emp_role.title AS "Title",
       department.dept_name AS "Department",
       emp_role.salary AS "Salary"

FROM employee
JOIN emp_role ON employee.role_id = emp_role.id
JOIN department ON emp_role.dept_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id AS employees
FROM employee
-- INNER JOIN department ON emp_role.dept_id = department.dept_name
-- left JOIN emp_role ON department.id = emp_role.dept_id
left JOIN employee ON emp_role.id = employee.id
-- left JOIN employee ON employee.manager_id = employee.id
-- ORDER BY employee.first_name;
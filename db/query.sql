SELECT employee.first_name AS title, emp_role.title
FROM emp_role
LEFT JOIN employee
ON emp_role.id = employee.id
ORDER BY employee.first_name;
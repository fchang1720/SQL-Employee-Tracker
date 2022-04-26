SELECT  emp_role.id AS "ID",
        emp_role.title AS "Title",
        emp_role.salary AS "Salary",
        department.name AS dept
                
    FROM emp_role
    JOIN department ON emp_role.dept_id = dept.id
    LEFT JOIN emp_role dept
    ON dept.id = emp_role.dept_id
    ORDER BY emp_role.id

INSERT INTO department(dept_name) 
    VALUES ('Construction'), ('Resource'), ('Defense'), ('Attack');


INSERT INTO emp_role(title, salary, dept_id)
    VALUES ('Builder', '50000', 1),
           ('Lead Builder', '75000', 1),
           ('Harvester', '65000', 2),
           ('Lead Harvester', '80000', 2),
           ('Guard', '70000', 3),
           ('Captain', '85000', 3),
           ('Soldier', '85000', 4),
           ('General', '95000', 4); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Fred', 'Flintstone', 2, null),
           ('Homer', 'Simpson', 1, 1),
           ('Bilbo', 'Baggins', 4, null),
           ('Frodo', 'Baggins', 3, 3),
           ('Sarah', 'Connor', 6, null), 
           ('Jill', 'Valentine', 5, 5),
           ('Levi', 'Ackerman', 8, null),
           ('Eren', 'Yeager', 7, 7);
USE employee_trackerDB;

-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary 
-- FROM employee INNER JOIN role ON (employee.role_id=role.id) INNER JOIN department ON (;


SELECT role.title, department.name, role.salary 
FROM role INNER JOIN department ON (role.department_id=department.id);


SELECT 
a.id, a.first_name, a.last_name, role.title, department.name, role.salary, 
concat(b.first_name, " ", b.last_name) AS manager 
FROM role INNER JOIN department ON (role.department_id=department.id) INNER JOIN employee AS a ON (role.id=a.role_id) 
LEFT JOIN employee AS b ON (a.manager_id=b.id);

-- FROM employee AS a left



-- CONCAT(col 1, ' ', col 2) AS manager
-- dunno how to reference employee's manager! Maybe join to itself?
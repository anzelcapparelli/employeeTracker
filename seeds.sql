INSERT INTO department (name) values ("Software Development"), ("Finance"), ("Sales"), ("Legal");

INSERT INTO role (title, salary, department_id) values 
("Lead Software Engineer", 150000, 1), ("Accountant", 125000, 2), ("Lead Sales Representative", 100000, 3), 
("Sales Representative", 80000, 3), ("Database Designer", 120000, 1), ("UX/UI Designer", 120000, 1), ("Lawyer", 200000, 4), ("Response-Based Developer", 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) values
("Jeane", "Grace", 1, NULL), ("Peter", "Dinkdladge", 2, NULL), ("Ruth", "Trent", 3, NULL), ("Reece", "Quentini", 4, 3), 
("Dwane", "Johnson", 5, 1), ("Julius", "Niro", 6, 1), ("F. Nick", "Wright", 7, NULL), ("Lauren", "Stones", 8, 6);


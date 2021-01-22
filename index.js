const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require('figlet');

var roleChoices = [];


// MySQL ref https://www.npmjs.com/package/mysql
// inquirer ref https://www.npmjs.com/package/inquirer
// console.table ref https://www.npmjs.com/package/console.table

//  https://github.com/anzelcapparelli/employeeTracker



var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;


    figlet("Employee Tracker", function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }

        console.log(data)
        console.log("\n\n\n")


        // run function to get started

        // console.log(getCurRoles());
        // getCurRoles();

        mainMenu();

    })

})




function mainMenu() {

    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices:
                    [
                        "Add", "View",/* "Update", "Delete",*/ "Exit"
                    ],
                name: "menu"
            }
        ])
        .then(answers => {

            switch (answers.menu) {

                case "Add":
                    addEl();
                    break;

                case "View":
                    viewEl();
                    break;

                default:
                    connection.end();
                    break;

            }
        })

}


function getCurRoles() {

    let currRoles;

    connection.query("SELECT role.title AS name, role.id AS value FROM role", function (err, res) {
        if (err) console.error(err);
        // Log all results of the SELECT statement
        currRoles = res;
        // console.log(res);
        // console.log(currRoles);

        // roleChoices = [{name: res.title, value: res.id}];

        // roleChoices= res.map((entry) => Object{name: entry.title, value: entry.id})

        // return res;
        // console.log(roleChoices);

        return currRoles;

    });


    return currRoles;

}


function getCurDepts() {

    connection.query("SELECT department.name, department.id FROM department", function (err, res) {
        if (err) console.error(err);
        // Log all results of the SELECT statement
        const currDepts = res;

        const deptChoices = [];
        currDepts.forEach(entry => {
            deptChoices.push({ name: entry.name, value: entry.id })
        });

        return deptChoices;

    });

}


function getCurEmp() {

    connection.query("SELECT concat(employee.first_name, '', employee.last_name) AS name, employee.id FROM employee", function (err, res) {
        if (err) console.error(err);
        // Log all results of the SELECT statement
        const currEmps = res;

        const empChoices = [];
        currEmps.forEach(entry => {
            empChoices.push({ name: entry.name, value: entry.id })
        });

        return empChoices;

    }).then(answers => empChoices);

}


// =========================================================================

// Requirements

// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles

function addEl() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to add?",
                choices:
                    [
                        "New Employee", "New Role", "New Department"
                    ],
                name: "addType"
            }
        ]).then(answers => {
            switch (answers.addType) {
                case "New Employee":
                    addEmp()
                    break;

                case "New Role":
                    // role adder inquirer
                    break;

                default:
                    // department adder inquirer
                    break;
            }
        })
}


// var query = connection.query(
//     "INSERT INTO auction_items SET ?",
//     {
//         item_name: "watch",
//         category: "jewelry",
//         current_bid: 1000
//     },

function addEmp() {

    var roles = getCurRoles();

    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter employee's first name:",
                name: "firstName"
            },
            {
                type: "input",
                message: "Please enter employee's last name:",
                name: "lastName"
            },
            {
                type: "list",
                message: "Please select employee's role:",
                choices: roles,
                name: "role"
            },
            {
                type: "list",
                message: "Please select employee's manager (or select 'leave blank'):",
                choices: [{ name: "a", value: 1 }, { name: "b", value: 2 }],
                name: "manager"
            },
        ])
        .then(answers => {


            // var query = connection.query(
            //     "INSERT INTO employee SET ?",
            //     {
            //         first_name: answers.firstName,
            //         last_name: answers.lastName,
            //         role_id: answers.role,
            //         manager_id: answers.manager
            //     },
            //     function (err, res) {
            //         if (err) throw err;
            //         console.log(res.affectedRows + "item added!\n");
            //         // Call updateProduct AFTER the INSERT completes
            //     }
            // );


        })

}


// =====================================================================================
// view

function viewEl() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to view?",
                choices:
                    [
                        "All Employees", "All Employees by Department", "All Employees by Manager",
                        "View All Roles", "View All Departments"

                    ],
                name: "viewType"
            }
        ]).then(answers => {
            switch (answers.viewType) {

                case "All Employees":
                    allEmpGen();
                    break;

                case "All Employees by Department":
                    // inquirer: pick dpt, then show
                    break;

                // case "All Employees by Manager":
                //     // inquirer: pick manager, then show
                //     break;

                case "View All Roles":
                    allRoles();
                    break;

                default:
                    allDepts();
                    break;
            }
        })
}


function allEmpGen() {

    connection.query(`SELECT a.id, a.first_name, a.last_name, role.title, department.name, role.salary, concat(b.first_name, ' ', b.last_name) AS manager 
    FROM role INNER JOIN department ON (role.department_id=department.id) INNER JOIN employee AS a ON (role.id=a.role_id) 
    LEFT JOIN employee AS b ON (a.manager_id=b.id);`, function (err, res) {
        if (err) { console.error(err) };
        // Log all results of the SELECT statement

        console.log("\n")
        console.table(res);
        console.log("\n")
        
    });
    
    mainMenu();
    
}

function allEmpDept() {

    // connection.query(, function (err, res) {
    //     if (err) {console.error(err)};

    //     console.table(res);
    // });

}

// function allEmpMangr(){}

function allRoles() {

    connection.query(`SELECT a.id, a.title AS role, department.name AS department, a.salary 
    FROM role AS a INNER JOIN department ON (a.department_id=department.id);`, function (err, res) {
        if (err) { console.error(err) };

        console.log("\n")
        console.table(res);
        console.log("\n")

    });
    mainMenu();

}

function allDepts() {

    connection.query(`SELECT department.id, department.name AS department 
    FROM department;`, function (err, res) {
        if (err) { console.error(err) };

        console.log("\n")
        console.table(res);
        console.log("\n")
    });
    mainMenu();

}



// connection.query("SELECT * FROM top5000 WHERE artist = ?", [answers.artist], function (err, res) {
//     if (err) console.error(err);
//     // Log all results of the SELECT statement
//     console.log(res);


    //===============================================================================================================

// Bonus

// Update employee managers
// View employees by manager
// Delete departments, roles, and employees
// View the total utilized budget of a department -- ie the combined salaries of all employees in that department
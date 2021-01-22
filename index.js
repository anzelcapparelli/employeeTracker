const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
var figlet = require('figlet');


// MySQL ref https://www.npmjs.com/package/mysql
// inquirer ref https://www.npmjs.com/package/inquirer
// console.table ref https://www.npmjs.com/package/console.table


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
        console.log("\n\n\n\n")


        // run function to get started
        // mainMenu();


        connection.query("SELECT role.title, role.id FROM role", function (err, res) {
            if (err) console.error(err);
            // Log all results of the SELECT statement
            const currRoles = res;

            const roleChoices = [];
            currRoles.forEach(entry => {
                roleChoices.push({name: entry.title, value: entry.id})
            });

            return console.log(roleChoices)

        });
        connection.query("SELECT department.name, department.id FROM department", function (err, res) {
            if (err) console.error(err);
            // Log all results of the SELECT statement
            const currentDepts = res;


        });
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
                name: "role"
            },
            {
                type: "input",
                message: "Please select employee's manager (or select 'leave blank'):",
                name: "manager"
            },
        ])
        .then(answers => {


            var query = connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    current_bid: 1000
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + "item added!\n");
                    // Call updateProduct AFTER the INSERT completes
                }
            );


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
            switch (answers.addType) {
                case "New Employee":
                    // employee adder inquirer
                    break;

                case "New Role":
                    // role adder inquirer
                    break;

                default:
                    // role adder inquirer
                    break;
            }
        })
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
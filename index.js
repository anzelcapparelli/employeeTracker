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

    // run function to get started

    figlet("Employee Tracker", function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)

        console.log("\n\n\n\n")

        mainMenu();
    });



})

function mainMenu() {

    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to search for?",
                choices:
                    [
                        "View All Employees", "all artists with multiple hits", "all data on songs within a specific range (ranking)", "search by song name", "exit"
                    ],
                name: "menu"
            }
        ])
        .then(answers => {

            console.log(answers);

            switch (answers.menu) {
                case "":
                    // function () { }
                    break;
            }
        })

}
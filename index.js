const mysql= require("mysql");
const inquirer= require("inquirer");
const cTable= require("console.table");


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
    console.log("connected as id " + connection.threadId + "\n");

    // run function to get started
    // mainMenu();

})
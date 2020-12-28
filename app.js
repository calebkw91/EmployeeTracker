const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mintplant12!",
    database: "employees_db"
});

connection.connect(function(err) 
{
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

let menu = async () =>
{
    const menu = await inquirer.prompt(
        [{
            type: "list",
            message: "What would you like to do? ",
            name: "choice",
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager',
                'Add department',
                'Add role',
                'Exit'
            ]
        }]);

    switch (menu.choice) 
    {
        case 'View all employees':
            viewAll();
            break;
        case 'View all employees by department':
            // viewAllByDept();
            break;
        case 'View all employees by manager':
            // viewAllByManager();
            break;
        case 'Add employee':
            addEmployee();
            break;
        case 'Remove employee':
            // removeEmployee();
            break;
        case 'Update employee role':
            updateRole();
            break;
        case 'Update employee manager':
            // updateManager();
            break;
        case 'Add department':
            addDepartment();
            break;
        case 'Add role':
            addRole();
            break;
        case 'Exit':
            console.log("Closing application");
            break;
        default:
            return;
    }
}

let viewAll = () => 
{

}

let addEmployee = () =>
{

}

let updateRole = () =>
{

}

let addDepartment = () =>
{

}

let addRole = () =>
{
    
}
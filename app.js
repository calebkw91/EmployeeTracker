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
    connection.query("SELECT employee.id AS 'ID', " +
                    "CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee', " +
                    "roles.title AS 'Title', " +
                    "department.dpname AS 'Department', " +
                    "roles.salary AS 'Salary', " +
                    "CONCAT(e.first_name, ' ', e.last_name) AS 'Manager' " +
                    "FROM employee " +
                    "INNER JOIN roles ON employee.role_id = roles.id " +
                    "INNER JOIN department ON department_id = department.id " +
                    "LEFT JOIN employee e ON employee.manager_id = e.id", (err, res) => 
    {
        if (err) throw err;
        console.table(res);
    });
}

let addEmployee = async () =>
{
    let roles = [];
    let managers = [];

    connection.query("SELECT DISTINCT title, id FROM roles", (err, res) =>
    {
        if (err) throw err;
        res.ForEach(role => roles.push(role.title));
    });

    connection.query("SELECT * FROM employee", (err, res) =>
    {
        if (err) throw err;
        res.ForEach(employee => managers.push(employee.first_name + " " + employee.last_name));
    });

    const employee = await inquirer.prompt(
        [{
            type: "input",
            message: "First name? ",
            name: "first_name"
        },{
            type: "input",
            message: "Last name? ",
            name: "last_name"
        }]);

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

viewAll();
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
                'View all departments',
                'View all roles',
                'Add employee',
                'Update employee role',
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
        case 'View all departments':
            viewAllDept();
            break;
        case 'View all roles':
            viewAllRoles();
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
        menu();
    });
}

let addEmployee = async () =>
{
    let roles = [];
    let managers = [];
    let rolesID = [];
    let managersID = [];

    connection.query("SELECT DISTINCT title, id FROM roles", (err, res) =>
    {
        if (err) throw err;
        rolesID = res;
        res.forEach(role => roles.push(role.title));
    });

    connection.query("SELECT * FROM employee", (err, res) =>
    {
        if (err) throw err;
        managersID = res;
        res.forEach(employee => managers.push(employee.first_name + " " + employee.last_name));
        managers.push("None");
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
        },{
            type: "list",
            message: "Role? ",
            name: "role_id",
            choices: roles
        },{
            type: "list",
            message: "Manager? ",
            name: "manager_id",
            choices: managers
        }]);

    rolesID.forEach(role => 
    {
        if(role.title == employee.role_id)
        {
            employee.role_id = role.id;
        }
    });
    
    managersID.forEach(manager =>
    {
        if((manager.first_name + " " + manager.last_name) == (employee.manager_id))
        {
            employee.manager_id = manager.id;
        }
        else if(employee.manager_id == "None")
        {
            employee.manager_id = null;
        }
    });
    
    connection.query("INSERT INTO employee SET ?", employee, (err, res) =>
    {
        if (err) throw err;
        menu();
    });

}

let updateRole = async () =>
{
    let roles = [];
    let employees = [];
    let rolesID = [];
    let employeesID = [];
    let employee;

    connection.query("SELECT DISTINCT title, id FROM roles", (err, res) =>
    {
        if (err) throw err;
        rolesID = res;
        res.forEach(role => roles.push(role.title));
    });

    connection.query("SELECT * FROM employee", async (err, res) =>
    {
        if (err) throw err;
        employeesID = res;
        res.forEach(employee => employees.push(employee.first_name + " " + employee.last_name));

        employee = await inquirer.prompt(
            [{
                type: "list",
                message: "Choose employee to modify: ",
                name: "id",
                choices: employees
            },{
                type: "list",
                message: "Choose a new role for the employee: ",
                name: "role_id",
                choices: roles
            }]);

        rolesID.forEach(role => 
        {
            if(role.title == employee.role_id)
            {
                employee.role_id = role.id;
            }
        });
        
        employeesID.forEach(emp =>
        {
            if((emp.first_name + " " + emp.last_name) == (employee.id))
            {
                employee.id = emp.id;
            }
        });

        let params = [employee.role_id, employee.id];
    
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", params, (err, res) =>
        {
            if (err) throw err;
            menu();
        });
    });
}

let addDepartment = async () =>
{
    const department = await inquirer.prompt(
        [{
            type: "input",
            message: "Department name? ",
            name: "dpname"
        }]);
    
    connection.query("INSERT INTO department SET ?", department, (err, res) =>
    {
        if (err) throw err;
        menu();
    });
}

let addRole = async () =>
{
    let departments = [];
    let departmentsID = [];

    connection.query("SELECT DISTINCT dpname, id FROM department", (err, res) =>
    {
        if (err) throw err;
        departmentsID = res;
        res.forEach(department => departments.push(department.dpname));
    });

    const role = await inquirer.prompt(
        [{
            type: "input",
            message: "Role title? ",
            name: "title"
        },{
            type: "input",
            message: "Salary? ",
            name: "salary"
        },{
            type: "list",
            message: "Department? ",
            name: "department_id",
            choices: departments
        }]);

    departmentsID.forEach(department => 
    {
        if(department.dpname == role.department_id)
        {
            role.department_id = department.id;
        }
    });
    
    connection.query("INSERT INTO roles SET ?", role, (err, res) =>
    {
        if (err) throw err;
        menu();
    });
}

let viewAllRoles = async () =>
{
    connection.query("SELECT title AS 'Title', " +
                    "salary AS 'Salary', " +
                    "dpname AS 'Department' " +
                    "FROM roles " +
                    "INNER JOIN department ON roles.department_id = department.id", (err, res) => 
    {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

let viewAllDept = async () =>
{
    connection.query("SELECT dpname AS 'Departments' " +
                    "FROM department ", (err, res) => 
    {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

viewAll();
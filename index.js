// dependencies
const inquirer = require('inquirer')
const mysql = require('mysql')
let {employeeQuestions, roleQuestions, deptQuestions} = require('./questions')

// db connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '****',
  database: 'employee_tracker_db',
})

// on connection:
connection.connect((err) => {
    if (err) throw err
    initApp()
})

// prompt user with options for how to proceed
const initApp = () =>{
    inquirer.prompt({
        name: 'initialize',
        type: 'list',
        message: 'What would you like to do?',
        choices: 
        [  
        'View All Employees',
        'Add Employee',
        'View All Departments',
        'Add Department',
        'View All Roles',
        'Add Role',
        'Exit'
        ]
    })

    //https://gyazo.com/a0764f8197fe385ad6361d70f287aeeb
    //give this a try at some point? 

    .then((res)=>{
        switch(res.initialize)
        {
        case 'View All Employees':
            getEmployees()
        break
        case 'Add Employee':
            addEmployee()
        break
        case 'View All Departments': 
            getDepartments()
        break
        case 'Add Department':
            addDepartment()
        break
        case 'View All Roles':
            getRoles()
        break
        case 'Add Role':
            addRole()
        break
        case 'Exit':
            connection.end()
            console.log('Bye!')
        break
        }
    })
}

const getEmployees = () => {
    const query = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.dept_name FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.dept_id=departments.id;'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
        initApp()
    })
}

const addEmployee = () => {}

const getDepartments = () => {
    const query = 'SELECT * FROM departments'
    connection.query(query, (err, res)=>{
        if (err) throw err
        console.table(res)
        initApp()
    })
}

const addDepartment = () => {}

const getRoles = () => {
    const query = 'SELECT title, salary FROM roles INNER JOIN departments ON roles.dept_id = departments.id'
    connection.query(query, (err, res)=>{
        if (err) throw err
        console.table(res)
        initApp()
    })
}

const addRole = () => {}
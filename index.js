// dependencies
const inquirer = require('inquirer')
const mysql = require('mysql')
// let {employeeQuestions, roleQuestions, deptQuestions} = require('./questions')

// db connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'HellMouthHere@96',
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

const addEmployee = () => {
    let titleArray = []
    const query = 'SELECT roles.title, roles.id FROM roles'
    connection.query(query, (err, res) => {
        if (err) throw err
        for(i=0;i<res.length; i++){
            titleArray.push(res[i].title)
        }
        
        inquirer
            .prompt([{
                type: "input",
                message: "What's your employee's first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What's your employee's last name?",
                name:"lastName" 
            },
            {
                type: "list",
                message: "What department do they work in?",
                choices: titleArray,
                name: "newRole"
            }
        ])

        .then((answer) => {
            //console.log(answer.newRole)
            const query = 'SELECT roles.id FROM roles WHERE ?'
            connection.query(query, {title: answer.newRole}, (err, res) => { //reverse searching for ID by name
                //if (err) throw err
                
                console.log(res[0].id)
                let roleID = res[0].id //response @ roles table @ id
            
                console.log(answer.firstName, answer.lastName, roleID)
                const query = 'INSERT INTO employees (first_name, last_name, role_id) VALUES (?)'
                let values = [answer.firstName, answer.lastName, roleID]
                connection.query(query, [values], (err,res) => {
                    if (err) throw err
                console.table(res)
                initApp() 
                })
            })
         })
    })
}

const getDepartments = () => {
    const query = 'SELECT * FROM departments'
    connection.query(query, (err, res)=>{
        if (err) throw err
        console.table(res)
        initApp()
    })
}

const addDepartment = () => {
    inquirer.prompt({
        type: "input",
        message: "What is the department's name?",
        name: "addDept"
    })
    .then((res)=>{
        const query = 'INSERT INTO departments (dept_name) VALUES (?)'
        connection.query(query, res.addDept, (err, res)=>{ 
            if (err) throw err

        getDepartments(res)
        })
    })
}

const getRoles = () => {
    const query = 'SELECT title, salary FROM roles INNER JOIN departments ON roles.dept_id = departments.id'
    connection.query(query, (err, res)=>{
        if (err) throw err
        console.table(res)
        initApp()
    })
}

const addRole = () => {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the role's title?",
        name: "title"
    },
    {
        type: "input",
        message: "What is the role salary?",
        name: "salary"
    },
    {
        type: "list",
        message: "What department is it in?",
        name: "dept_name",
        choices(){
            return new Promise((resolve, reject)=>{ //need this to fire asynchronously
                connection.query('SELECT dept_name FROM departments', (err,res)=>{
                    let departments = [];
                    res.forEach(({dept_name})=>{ //mapping object? 
                        departments.push(dept_name)
                    })
                    resolve(departments);
                })
            })
        },
    }
    ])
    .then((answer)=>{
        const query = 'SELECT departments.id FROM departments WHERE ?'
            connection.query(query, {dept_name: answer.dept_name}, (err, res) => {    
                console.log(res[0].id)
                let deptID = res[0].id
            
                // console.log(answer.title, answer.salary, deptID)
                const query = 'INSERT INTO roles (title, salary, dept_id) VALUES (?)'
                let values = [answer.title, answer.salary, deptID]
                connection.query(query, [values], (err,res) => {
                    if (err) throw err
                console.table(res)
                initApp() 
             })
         })      
    })
}
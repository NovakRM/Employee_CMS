// dependencies
const mysql = require('mysql')
const inquirer = require('inquirer')

// db connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '****',
  database: 'employee_tracker_schema',
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
        type: '',
        message: '',
        choices: ['']
    })
    .then((res)=>{
        switch(res.initialize)
        {
        case 'exit':
            connection.end()
        break
        }
    })
}
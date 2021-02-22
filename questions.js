let employeeQuestions =  [
    {
        type: "input",
        message: "What's your employee's first name?",
        name: "first_name"
    },
    {
        type: "input",
        message: "What's your employee's last name?",
        name: "last_name"
    },
    {
        type: "list",
        message: "What department do they work in?",
        name: "role",
        choices: []
    }
]

let roleQuestions =  [
    {
        type: "input",
        message: "What is the name of the role?",
        name: "title"
    }
]

let deptQuestions =  [
    {
        type: "input",
        message: "What's your department's name?",
        name: "name"
    },
]

//export question sets
module.exports =  {employeeQuestions, roleQuestions, deptQuestions}
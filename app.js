// node modules
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const axios = require('axios')

// lib modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Array for manager, engineer and intern
let employees = [];

//Variables to validate responses
var validName = (input) => {   
    //ensure that name isn't empty string or contains numbers                              
    if ( input === "" || input.match(/\d+/g)!=null) {
       return "Please enter valid name";
    }
     return true;
}    
var notNumber = (input) => {
    //ensure that user input is a valid number
    if (isNaN(input)) {
      return "Please enter a number";
    }
    return true;
}
var notEmpty = (input) => {
    //ensure that name isn't empty string
    if (input === "") {
      return "Please enter a valid response";
    }
    return true;
}
var validateEmail =  (input) => {
    //ensure that email has the correct format
    var r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( r.test(input) != true) {
       return "Please enter valid email";
    }
    return true
}
var github = async (input, data) => {
    //ensure that the username is a valid github username 
    const queryUrl= `https://api.github.com/users/${input}`
    try{
        await axios.get(queryUrl)
        return true
    }catch{
        return 'GITHUB user not found!'
    }
}
//Qusetion Array
const questions = [
    {
    type: 'list',
        name: 'role',
        message: 'Choose employee role :',
        choices: ['Manager', 'Engineer', 'Intern'],
        default: 'Manager'
    },
    {
    type: 'input',
        name: 'name',
        message: "What is the manager's name?",
        when: (data) => data.role === 'Manager',
        validate: validName
    },
    {
    type: 'input',
        name: 'name',
        message: "What is the engineer's name?",
        when: (data) => data.role === 'Engineer',
        validate: validName
    },
    {
    type: 'input',
        name: 'name',
        message: "What is the intern's name?",
        when: (data) => data.role === 'Intern',
        validate: validName
    },
    {
    type: 'input',
        name: 'id',
        message: "What is the ID number?",
        validate: notNumber
    },
    {
    type: 'input',
        name: 'officeNumber',
        message: "What is the manager's office number?",
        when: (data) => data.role === 'Manager',
        validate: notEmpty
    },
    {
    type: 'input',
        name: 'github',
        message: "What is the engineer's github username?",
        when: (data) => data.role === 'Engineer',
        validate: github
    },
    {
    type: 'input',
        name: 'school',
        message: "Which school does the intern attend?",
        when: (data) => data.role === 'Intern',
        validate: notEmpty
    },
    {
    type: 'input',
        name: 'email',
        message: "Enter the employee's email address.",
        validate: validateEmail
    },
    {
    type: 'confirm',
        name: 'addnew',
        message: "Would you like to add another employee?",
    },
]

// function to ask questions
const userPrompt = () =>
inquirer.prompt(questions)
.then((data) => {
    if (data.role === 'Manager'){
        employees.push(new Manager(data.name.toUpperCase(), data.id, data.email, data.officeNumber))
    } else if (data.role === 'Engineer'){
        employees.push(new Engineer(data.name.toUpperCase(), data.id, data.email, data.github))
    } else {
        employees.push(new Intern(data.name.toUpperCase(), data.id, data.email, data.school))
    } 

    if (data.addnew === true) {
        userPrompt();
    }else{
        fs.writeFile(outputPath,render(employees),(err) =>
        err ? console.log(err) : console.log('Successfully added to team!'));
    } 
})

userPrompt();




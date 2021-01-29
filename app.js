// node modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// lib modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Array for manager, engineer and intern
let employees = [];

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
        message: "What is the employee's name?",
    },
    {
    type: 'input',
        name: 'id',
        message: "What is the employee's ID number?",
    },
    {
    type: 'input',
        name: 'officeNumber',
        message: "What is the office number?",
        when: (data) => data.role === 'Manager'
      
    },
    {
    type: 'input',
        name: 'github',
        message: "What is the employee's github username?",
        when: (data) => data.role === 'Engineer'
    },
    {
    type: 'input',
        name: 'school',
        message: "Which school does the employee attend?",
        when: (data) => data.role === 'Intern'
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the employee's email address.",
    },
]

const userPrompt = () =>
inquirer.prompt(questions)
  .then((data) => {
    if (data.role === 'Manager'){
        employees.push(new Manager(data.name, data.id, data.email, data.officenumber))
    } else if (data.role === 'Engineer'){
        employees.push(new Engineer(data.name, data.id, data.email, data.github))
    } else {
        employees.push(new Intern(data.name, data.id, data.email, data.school))
    } 
    
  })



  userPrompt();
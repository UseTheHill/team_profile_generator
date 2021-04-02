const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

let teamMembers = [];

let employeeBasics = [
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        choices: ['Manager', 'Engineer', 'Intern'],
        name: 'employeeType',
    },
    {
        type: 'input',
        message: "Employee's Name",
        name: 'name',
    },
    {
        type: 'input',
        message: "Employee's Id",
        name: 'id',
    },
    {
        type: 'input',
        message: "Employee's Email",
        name: 'email',
    },
];

let managerSpecifics = [
    {
        type: 'input',
        message: "Office Number",
        name: 'officeNumber',
    },
];

let engineerSpecifics = [
    {
        type: 'input',
        message: "Github username",
        name: 'githubUsername',
    },
];

let internSpecifics = [
    {
        type: 'input',
        message: "School",
        name: 'school',
    },
];

let verify = [
    {
        type: 'confirm',
        message: "Want to add another employee? Hit enter for YES",
        name: 'verify',
        default: true,
    },
];
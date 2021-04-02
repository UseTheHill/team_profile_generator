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

function addEmployee() {
    inquirer.prompt(employeeBasics).then((response) => {
        let name = response.name;
        let id = response.id;
        let email = response.email;
        if (response.employeeType === "Manager") {
            inquirer.prompt(managerSpecifics).then((response) => {
                let newEmployee = new Manager(name, id, email, response.officeNumber);
                teamMembers.push(newEmployee);
                console.log(teamMembers);
                checkComplete();
            });
        };


        if (response.employeeType === "Engineer") {
            inquirer.prompt(engineerSpecifics).then((response) => {
                let newEmployee = new Engineer(name, id, email, response.githubUsername);
                teamMembers.push(newEmployee);
                console.log(teamMembers);
                checkComplete();
            });
        };

        if (response.employeeType === "Intern") {
            inquirer.prompt(internSpecifics).then((response) => {
                let newEmployee = new Intern(name, id, email, response.school);
                teamMembers.push(newEmployee);
                console.log(teamMembers);
                checkComplete();
            });
        };

    });
};

function checkComplete() {
    inquirer.prompt(verify).then((response) => {
        if (response.verify) {
            addEmployee();
        } else {
            let pageContent = render(teamMembers);
            fs.writeFile(outputPath, pageContent, (err) => err ? console.error(err) : console.log('Success!')
            );
        }
    });
};

addEmployee();
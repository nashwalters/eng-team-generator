// Import employee class
const Employee = require ('../lib/Employee')

//Create engineer class that extends employee class
class Engineer extends Employee {
    constructor(name, id, email, github){
    super(name, id, email)
    this.github = github;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return 'Engineer';
    }
} 

//export engineer class
module.exports = Engineer

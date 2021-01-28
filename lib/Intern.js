// Import employee class
const Employee = require ('../lib/Employee')

//Create intern class that extends employee class
class Intern extends Employee {
    constructor(name, id, email, school){
    super(name, id, email)
    this.school = school;
    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return 'Intern';
    }
} 

//export intern class
module.exports = Intern
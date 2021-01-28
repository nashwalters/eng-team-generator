// Import employee class
const Employee = require ('../lib/Employee')

//Create manager class that extends employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
    super(name, id, email)
    this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return 'Manager';
    }
} 

//export manager class
module.exports = Manager
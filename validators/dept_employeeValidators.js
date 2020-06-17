const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Dept_employee } = require('../models/depts_employees');


const EmployeeMultipleTitles = {
    validate: async function (typeName, originalObj, materializedObj) {
        const AssignedEmployee = await Dept_employee.findOne({
            empID: materializedObj.empID,
        });
        if (AssignedEmployee) {
            if (
                materializedObj.from_date >= AssignedEmployee.from_date 
                &&
                AssignedEmployee.to_date >= materializedObj.from_date
                ||
                materializedObj.to_date >= AssignedEmployee.from_date
                &&
                AssignedEmployee.to_date >= materializedObj.to_date
            ){
                throw new AssignedEmployeeMultipleTitle (typeName)
            }
        }
    }
};

class AssignedEmployeeMultipleTitle  extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Error. The employee can't be assigned to more departments",
            "AssignedEmployeeMultipleTitle"
        );
    }
};


module.exports = { EmployeeMultipleTitles };
  
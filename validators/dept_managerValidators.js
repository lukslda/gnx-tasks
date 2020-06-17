const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Dept_manager } = require("../models/depts_managers");


const ManagersAssignedInSameDept = {
    validate: async function (typeName, originalObj, materializedObj) {
        const managerAssigned = await Dept_manager.findOne({
            empID: materializedObj.empID,
        });
        if (managerAssigned) {
            if (
                materializedObj.from_date >= managerAssigned.from_date 
                    &&
                managerAssigned.to_date >= materializedObj.from_date
                    ||
                materializedObj.to_date >= managerAssigned.from_date 
                    &&
                managerAssigned.to_date >= materializedObj.to_date
            ){
                throw new ManagerAssignedError (typeName);
            }
        }
    }
};

class ManagerAssignedError extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Can't assign more than one manager in a department in the same portion of time",
            "ManagerAssignedError"
        );
    }
};


module.exports = { ManagersAssignedInSameDept };
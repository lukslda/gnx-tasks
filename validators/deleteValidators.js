const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Departments } = require('../models/departments');
const { Employees } = require('../models/employees');


const CantDeleteRelationWithDept = {
    validate: async function (typeName, originalObj, materializedObj) {
        const employeeFinded = await Employees.findOne({id:materializedObj.empID});
        if (employeeFinded) {
            throw new RelationWithEmployee (typeName);
        }
        const deptFinded = await Departments.findById(materializedObj.deptID);
        if (deptFinded) {
            throw new RelationWithDept(typeName);
        }
    }
};

class RelationWithDept extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "can't be deleted because it contains information from one or more departments",
            "RelationWithDept"
        );
    }
};

const CantDeleteRelationWithEmployee = {
    validate: async function (typeName, originalObj, materializedObj) {
        const employee = await Employees.findOne({id:materializedObj.empID});
        if (employee) {
            throw new RelationWithEmployee (typeName);
        }
    }
};

class RelationWithEmployee  extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Can't be deleted because it contains information on one or more employees",
            "RelationWithEmployee"
        );
    }
};

  
module.exports = { CantDeleteRelationWithDept, CantDeleteRelationWithEmployee };
  
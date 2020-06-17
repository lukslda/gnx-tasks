const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Employees } = require('../models/employees');


const CantRepeatDNI = {
    validate: async function (typeName, originalObject, materializedObject) {
        const EmployeeFinded = await Employees.findOne({ 'dni' : materializedObject.dni });
        if (EmployeeFinded && EmployeeFinded._id != materializedObject.id) {
            throw new YouCantRepeatDNI(typeName);
        }
    }
};

class YouCantRepeatDNI extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "The DNI is already registered, you cannot use it",
            "YouCantRepeatDNI"
        );
    }
};

const ofLegalAge = {
    validate: async function(typeName, originalObj, materializedObj) {
        const currentDate = new Date();
        const birthDate = new Date(materializedObj.birth_date);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        if (age <= 17) {
            throw new underage(typeName);
        }
    }
};

class underage extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "The employee is not of legal age",
            "underage"
        );
    }
};


module.exports = { CantRepeatDNI, ofLegalAge };
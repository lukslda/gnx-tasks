const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;
const { Departments } = require('../models/departments');


const CantRepeatName = {
    validate: async function (typeName, originalObj, materializedObj) {
        const Dept = await Departments.findOne({
            name: materializedObj.name,
        });
        if (Dept && Dept.id != materializedObj.id) {
            throw new DeptWithSameName (typeName);
        }
    }
};

class DeptWithSameName extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Error. The name is already in use",
            "DeptWithSameName"
        );
    }
};


module.exports = { CantRepeatName };
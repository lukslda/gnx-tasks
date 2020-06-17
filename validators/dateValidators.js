const gnx = require('@simtlix/gnx');
const GNXError = gnx.GNXError;

const dateValidation = {
        validate: function (typeName, originalObj, materializedObj) {
            if (materializedObj.from_date >= materializedObj.to_date) {
                throw new invalidDate(typeName);
            }
        }
    };

class invalidDate extends GNXError {
    constructor(typeName) {
        super(
            typeName,
            "Invalid date. Field 'from_date' is less than field 'to_date'.",
            "invalidDate"
        );
    }
};
  

module.exports = { dateValidation };
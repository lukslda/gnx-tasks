const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentsFields = {
    dept_name: String
};

const departmentsSchema = new Schema(departmentsFields);
const Departments = mongoose.model('Departments', departmentsSchema);

if(!Departments.collection.collection) {
    Departments.createCollection();
}

module.exports = { departmentsFields, Departments};
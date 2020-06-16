const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const employeesFields = {
    dni: Number,
    name: String,
    last_name: String,
    birth_date: Date,
    gender: String,
    hire_date: Date,
};

const employeesSchema = new Schema(employeesFields);
const Employees = mongoose.model('Employees', employeesSchema);

if (!Employees.collection.collection) {
    Employees.createCollection();
}

module.exports = {employeesFields, Employees};
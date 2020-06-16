const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const salariesFields = {
    empId: Schema.Types.ObjectId,
    salary: Number,
    from_date: Date,
    to_date: Date
};

const salariesSchema = new Schema(salariesFields);
const Salaries = mongoose.model('Salaries', salariesSchema);

if (!Salaries.collection.collection) {
    Salaries.createCollection();
}

module.exports = {salariesFields, Salaries};
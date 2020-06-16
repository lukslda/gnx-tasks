const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const titlesFields = {
    empId: Schema.Types.ObjectId,
    title: String,
    from_date: Date,
    to_date: Date
};

const titleSchema = new Schema(titlesFields);
const Titles = mongoose.model('Titles', titleSchema);

if (!Titles.collection.collection) {
    Titles.createCollection();
}

module.exports = {titlesFields, Titles};
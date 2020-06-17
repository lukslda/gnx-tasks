const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const departments = require('../models/departments').Departments;
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const { CantRepeatName } = require("../validators/departmentValidators");


const DepartamentType = new GraphQLObjectType({
    name: "departmentType",
    description: "Represents departments",
    extensions: {
        validations: {
          'CREATE': [CantRepeatName],
          'UPDATE': [CantRepeatName]
        }
    },
    fields: () => ({
        id: { type: GraphQLID },
        dept_name: { type: GraphQLString },
    })
});

gnx.connect(departments, DepartamentType, "department", "departments");


module.exports = DepartamentType;
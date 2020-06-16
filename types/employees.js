const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const employeesModel = require('../models/employees').Employees;
const Gender = require("./enum/gender");


const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const employeeType = new GraphQLObjectType({
    name: "Employees",
    description: "Represents employees",
    fields: () => ({
        id: { type: GraphQLID },
        dni: { type: GraphQLInt },
        name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        gender: { type: Gender },
        birth_date: { type: GraphQLString },
        hire_date: { type: GraphQLString },
    }),
});
  
gnx.connect(employeesModel, employeeType, "employee", "employees");
  
module.exports = employeeType;
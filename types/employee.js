const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const employees = require('../models/employees').Employees;
const Gender = require("./enum/gender");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const { CantRepeatDNI, ofLegalAge } = require('../validators/employeesValidators');


const EmployeeType = new GraphQLObjectType({
    name: "Employee",
    description: "Represents employees",
    extensions: {
        validations: {
            'CREATE': [CantRepeatDNI, ofLegalAge],
            'UPDATE': [CantRepeatDNI, ofLegalAge]
        }
    },
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
  
gnx.connect(employees, EmployeeType, "employee", "employees");
  

module.exports = EmployeeType;
const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const salaries = require("../models/salaries").Salaries;
const employees = require("../models/employees").Employees;
const employeesType = require('./employee');
const { GraphQLObjectType, GraphQLFloat, GraphQLID, GraphQLString } = graphql;
const { dateValidation } = require('../validators/dateValidators');
const { CantDeleteRelationWithEmployee } = require('../validators/deleteValidators');


const SalaryType = new GraphQLObjectType({
    name: "SalaryType",
    description: "Represents salaries",
    extensions: {
        validations: {
          'CREATE': [ dateValidation ],
          'UPDATE': [ dateValidation ],
          'DELETE': [ CantDeleteRelationWithEmployee ]
        }
      },
    fields: () => ({
        id: { type: GraphQLID },
        salary: { type: GraphQLFloat },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString },
        employee: {
            type: employeesType,
            extensions: {
                relation: {
                    embedded: false,
                    connectionField: 'empID'
                }
            },
            resolve: (parent, args) => {
                return employees.findById(parent.empID);
            }
        }
    })
});

gnx.connect(salaries, SalaryType, "salary", "salaries");


module.exports = SalaryType;
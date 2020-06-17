const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const titles = require('../models/titles').Titles;
const employees = require('../models/employees').Employees;
const employeeType = require("./employee");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const { dateValidation } = require('../validators/dateValidators');
const { CantDeleteRelationWithEmployee } = require('../validators/deleteValidators');


const TitleType = new GraphQLObjectType({
    name: "TitleType",
    description: "Represents titles",
    extensions: {
        validations: {
          'CREATE': [ dateValidation ],
          'UPDATE': [ dateValidation ],
          'DELETE': [ CantDeleteRelationWithEmployee ]
        }
      },
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString },
        employee: {
            type: employeeType,
            extensions: {
                relation: {
                    connectionField: 'empID'
                }
            },
            resolve: (parent, args) => {
                return employees.findById(parent.empID);
            }
        }
    })
});

gnx.connect(titles, TitleType, "title", "titles");


module.exports = TitleType;

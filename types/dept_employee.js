const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const dept_employees = require("../models/depts_employees").Dept_employees;
const departaments = require("../models/departments").Departaments;
const employees = require("../models/employees").Employees;
const employeeType = require("./employee");
const departamentType = require("./department");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const { dateValidation } = require('../validators/dateValidators');
const { CantDeleteRelationWithDept } = require('../validators/deleteValidators');
const { EmployeeMultipleTitles } = require('../validators/dept_employeeValidators');


const Dept_employeeType = new GraphQLObjectType({
    name: "Dept_employeeType",
    description: "Represents Depts employees",
    extensions: {
        validations: {
          'CREATE': [ dateValidation, EmployeeMultipleTitles],
          'UPDATE': [ dateValidation, EmployeeMultipleTitles],
          'DELETE': [ CantDeleteRelationWithDept ]
        }
      },
    fields: () => ({
        id: { type: GraphQLID },
        from_date: { type: GraphQLString },
        to_date: { type: GraphQLString },
        employee: {
        type: employeeType,
        extensions: {
            relation: {
            connectionField: "empID"
            }
        },
        resolve: (parent, args) => {
            return employees.findById(parent.empID);
        }
        },
        dept: {
            type: departamentType,
            extensions: {
                relation: {
                    connectionField: "deptID"
                }
            },
            resolve: (parent, args) => {
                return departaments.findById(parent.deptID);
            }
        }
    })
});

gnx.connect(dept_employees, Dept_employeeType, "dept_employee", "depts_employees");
  

module.exports = Dept_employeeType;
  
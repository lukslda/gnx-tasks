const graphql = require('graphql');
const gnx = require('@simtlix/gnx');
const dept_manager = require("../models/depts_managers").Dept_manager;
const departaments = require("../models/departments").Departaments;
const employees = require("../models/employees").Employees;
const employeeType = require("./employee");
const departamentType = require("./department");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const { dateValidation } = require('../validators/dateValidators');
const { CantDeleteRelationWithDept } = require('../validators/deleteValidators');
const { ManagersAssignedInSameDept } = require('../validators/dept_managerValidators');


const Dept_managerType = new GraphQLObjectType({
  name: "Dept_managerType",
  description: "Represents depts managers",
  extensions: {
    validations: {
      'CREATE': [ dateValidation, ManagersAssignedInSameDept],
      'UPDATE': [ dateValidation, ManagersAssignedInSameDept],
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

gnx.connect(dept_manager, Dept_managerType, "dept_manager", "depts_managers");


module.exports = Dept_managerType;

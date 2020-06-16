const graphql = require("graphql");


const { GraphQLEnumType } = graphql;
const gender = new GraphQLEnumType({
  name: "Gender",
  values: {
    M: { value: "male" },
    F: { value: "female" },
  },
});

module.exports = gender;

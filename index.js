const express = require("express");
const app = express();
const gnx = require("@simtlix/gnx");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/example', { replicaSet: 'rs' });

mongoose.connection.once("open", () => {
  console.log("DB connected!");
});

const types = require('./types/employees');
const includedTypes = Object.values(types);
const schema = gnx.createSchema(includedTypes, includedTypes);

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
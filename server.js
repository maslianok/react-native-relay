var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language

const schemaData = require('./data/schema');

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();

function logger(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(logger);

app.use('/graphql', graphqlHTTP({
  schema: schemaData.schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000);
console.log('Running a GraphQL API server at localhost:3000/graphql');

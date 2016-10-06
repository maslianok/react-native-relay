var express = require('express');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');

// Construct a schema, using GraphQL schema language
const schemaData = require('./data/schema');
var app = express();

function logger(req,res,next){
  console.log(new Date(), req.method, req.url);
  next();
}

app.use(cors());
app.use(logger);

app.use('/graphql', graphqlHTTP({
  schema: schemaData.schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

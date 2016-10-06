var fs = require('fs');
var path = require('path');
var {graphql}  = require('graphql');
var {introspectionQuery, printSchema} = require('graphql/utilities');

// Assume your schema is in ../data/schema
var {schema} = require('../data/schema');
const yourSchemaPath = path.join(__dirname, '../data/schema');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    `${yourSchemaPath}.json`,
    JSON.stringify(result, null, 2)
  );
});

// Save user readable type system shorthand of schema
fs.writeFileSync(
  `${yourSchemaPath}.graphql`,
  printSchema(schema)
);

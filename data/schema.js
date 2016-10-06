const {
    GraphQLSchema,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString
} = require('graphql');
let store = {};

const LINKS = [
  {_id: '1', title: 'title1', url: 'wqe/qwe1'},
  {_id: '2', title: 'title2', url: 'wqe/qwe2'},
  {_id: '3', title: 'title3', url: 'wqe/qwe3'},
];


let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: ()=> ({
        links: {
            type: new GraphQLList(linkType),
            resolve: () => LINKS // db.collection('links').find({}).toArray()
        }
    })
});

let linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: ()=> ({
            store: {
                type: storeType,
                resolve: () => store
            }
        })
    })
});

module.exports = { schema }

// `babel-relay-plugin` returns a function for creating plugin instances
const getBabelRelayPlugin = require('babel-relay-plugin');

// load previously saved schema data (see "Schema JSON" below)
const schemaData = require('../data/schema.json');

// create a plugin instance
const plugin = getBabelRelayPlugin(schemaData.data);

// compile code with babel using the plugin
module.exports = { plugins: [getBabelRelayPlugin(schemaData.data, { abortOnError: true })] }

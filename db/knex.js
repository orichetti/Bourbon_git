const knex = require('knex');

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: './Bourbon.db',
        useNullAsDefault: true
    }
});
module.exports = connectedKnex;
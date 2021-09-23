const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

var dbo;

module.exports = {

    connectToServer: function( callback ) {
        MongoClient.connect( url,  { useNewUrlParser: true }, function( err, db ) {
            dbo  = db.db('facsimile_db');
            return callback( err );
        } );
    },

    getDb: function() {
        return dbo;
    }
};
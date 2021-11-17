import {MongoClient} from 'mongodb';
const url = "mongodb://localhost:27017";

var dbo;
 
export default function connectToServer (callback) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, db ) {
        dbo  = db.db('facsimile_db');
        return callback( err );
    });
}

export function getDb() {
    return dbo;
}

export function makeQuery (callback, dbo, query) {
    dbo.collection("facsimile_img_1").find(query).toArray(function(err, res) {
        return callback (err, res);
    });
}


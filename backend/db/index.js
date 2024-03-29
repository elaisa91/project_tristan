import {MongoClient} from 'mongodb';
const url = "mongodb://mongo:27017";

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

export function makeQuery (callback, dbo, query, projection) {
    dbo.collection("facsimile_img_3").find(query).project(projection).toArray(function(err, res) {
        return callback (err, res);
    });
}


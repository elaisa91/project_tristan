import mongodb from 'mongodb';
const { MongoClient } = mongodb;
const url = "mongodb://root:example@localhost:27017";

var dbo;
 
export default function connectToServer (callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function( err, db ) {
        if(err) {
            console.log("errore");
            console.log(err);
        } else {
            dbo  = db.db('facsimile_db');
            return callback( err );
        }
    });
}

export function getDb() {
    return dbo;
}

export function makeQuery (callback, dbo, query, projection) {
    dbo.collection("facsimile_img_2").find(query).project(projection).toArray(function(err, res) {
        return callback (err, res);
    });
}


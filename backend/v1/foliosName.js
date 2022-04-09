import {getDb, makeQuery} from '../db/index.js';

function foliosNameGet(req, res){
    var dbo = getDb();
    var query = {};
    var projection = {};
    makeQuery(function(err, result) {
        if (err) throw err;
        var folios = [];
        for (const facsimile of result){
            for (const key in facsimile){
                if(key ==='name'){
                    folios.push(facsimile[key]);
                }
            }
        }
        res.send(JSON.stringify(folios)); 
    }, dbo, query, projection);

}

export default foliosNameGet;
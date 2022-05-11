import {getDb, makeQuery} from '../db/index.js';

function categoriesGet(req, res){
    var dbo = getDb();
    var query = {};
    var projection = {};
    makeQuery(function(err, result) {
        if (err) throw err;
        var categories = [];
        for (const facsimile of result){
            for (const key in facsimile){
                if(key !== '_id' && key !== 'name' && key !== 'url' && key !== 'multispec_url' && key !== 'notes' && key !== 'Register' && key!= 'num' && !categories.includes(key)){
                    categories.push(key);
                }
            }
        }
        res.send(JSON.stringify(categories)); 
    }, dbo, query, projection);
}

export default categoriesGet;
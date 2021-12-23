import {getDb, makeQuery} from '../db/index.js';

function categoriesGet(req, res){
    var dbo = getDb();
    makeQuery(function(err, result) {
        if (err) throw err;
        var categories = [];
        for (const facsimile of result){
            for (const key in facsimile){
                if(key!=='_id' && key!=='name' && key!=='url' && !categories.includes(key)){
                    categories.push(key);
                }
            }
        }
        res.send(JSON.stringify(categories)); 
    }, dbo, {});
}

export default categoriesGet;
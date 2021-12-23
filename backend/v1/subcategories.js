import {getDb, makeQuery} from '../db/index.js';

function subcategoriesGet(req, res){
    var dbo = getDb();
    makeQuery(function(err, result) {
        if (err) throw err;
        var subcategories = [];
        for (const facsimile of result){
            console.log("ciao");
        }
        res.send(JSON.stringify(subcategories)); 
    }, dbo, {});
}

export default subcategoriesGet;
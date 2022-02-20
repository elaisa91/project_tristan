import {getDb, makeQuery} from '../db/index.js';

function subcategoriesGet(req, res){
    var dbo = getDb();
    var query = {};
    var projection = {};
    query[req.params.selectedCategory]={$exists:true};
    makeQuery(function(err, result) {
        if (err) throw err;
        var subcategories = [];
        for (const facsimile of result){
            for (const zone of facsimile[req.params.selectedCategory]){
                if (zone["subcategory"]['name'] !== ""){
                    var subcategory = zone["subcategory"]["name"];
                    if (!subcategories.includes(subcategory)){
                        subcategories.push(subcategory);
                    }
                }
            }
        }
        res.send(JSON.stringify(subcategories));
    }, dbo, query, projection);
}

export default subcategoriesGet;
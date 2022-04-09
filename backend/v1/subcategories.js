import {getDb, makeQuery} from '../db/index.js';

function extract_subcategories(key, array){
    for (const zone of key){
        if (zone["subcategory"]['name'] !== ""){
            var subcategory = zone["subcategory"]["name"];
            if (!array.includes(subcategory)){
                array.push(subcategory);
            }
        }
    }   
    return array;
}

function subcategoriesGet(req, res){
    var dbo = getDb();
    var query = {};
    var projection = {};
    query = {};
    makeQuery(function(err, result) {
        if (err) throw err;
        var subcategories = [];
        for (const facsimile of result){
            for (const key in facsimile){
                if(key !== '_id' && key !== 'name' && key !== 'url' && key!= 'notes' && key!= 'num'){
                    if (req.params.selectedCategory === "null"){
                        subcategories.concat(extract_subcategories(facsimile[key], subcategories));
                    } else if (key === req.params.selectedCategory) {
                        subcategories = extract_subcategories(facsimile[key], subcategories);
                    }
                } 
            } 
        }
        res.send(JSON.stringify(subcategories));
    }, dbo, query, projection);
}

export default subcategoriesGet;
import {getDb, makeQuery} from '../db/index.js';

function individualsGet(req, res){
    var dbo = getDb();
    makeQuery(function(err, result) {
        if (err) throw err;
        var persons = [];
        for (const facsimile of result){
            var individuals = facsimile["Individual"];

            for (const person of individuals){
        
                if (!persons.includes(person['subcategory'])){
                    persons.push(person['subcategory']);
                }
            }
        }
        res.send(JSON.stringify(persons));   
    }, dbo, {});
}

export default individualsGet;
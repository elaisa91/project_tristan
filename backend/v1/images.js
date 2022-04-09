import {getDb, makeQuery} from '../db/index.js';

function imagesGet(req, res){
    var dbo = getDb();
    var query = {};
    var projection = {};
    makeQuery(function(err, result) {
        if (err) throw err;
        var result_images = [];
        for (const facsimile of result){
            var found = false;
            if (req.params.selectedOption === "null"){
                found = true;
            } else {
                for (const key in facsimile){
                    if(key === 'name'){
                        if (facsimile[key] === req.params.selectedOption){
                            found = true;
                            break;
                        }
                        
                    }
                    if(key !== '_id' && key !== 'name' && key !== 'url' && key!= 'notes' && key!= 'num'){
                        if (key === req.params.selectedOption){
                            found = true;
                            break;
                        }
                        for (const zone of facsimile[key]){
                            if (zone["subcategory"]!=={} && zone["subcategory"]["name"] === req.params.selectedOption){
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (found === true){
                var image = {src: facsimile["url"], id: facsimile["name"], num: facsimile["num"], polygons: []};
                for (const key in facsimile){
                    if(key!=='_id' && key!=='name' && key!=='url' && key!= 'notes' && key != 'num'){
                        image["polygons"] = image["polygons"].concat(facsimile[key]);
                    }
                }
                result_images.push(image);
            }
        }
        res.send(JSON.stringify(result_images));  
    }, dbo, query, projection);
}

export default imagesGet;
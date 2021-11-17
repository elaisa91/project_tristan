import {getDb, makeQuery} from '../db/index.js';

function imagesGet(req, res){
    var dbo = getDb();
    makeQuery(function(err, result) {
        if (err) throw err;
        var result_images = [];
        for (const facsimile of result){
            var found = false;
            var key = 0;
            while (found === false && key < Object.keys(facsimile).slice(3).length){
                
                var category = facsimile[Object.keys(facsimile).slice(3)[key]];
                for (const item of category){
                    if (item['subcategory'] === req.params.selectedOption){
                        found = true;
                        break;
                    }
                }
                key++;
            }
            if(found === true){
                var polygons = []
                for (const key of Object.keys(facsimile).slice(3)){
                    var category = facsimile[key];
                    for (const item of category){ 
                        polygons.push(item);
                    }
                }
                var image = {src: facsimile["url"], id: facsimile["name"], polygons: polygons}
                result_images.push(image);
            }
        }
        res.send(JSON.stringify(result_images));  
    }, dbo, {});
}

export default imagesGet;
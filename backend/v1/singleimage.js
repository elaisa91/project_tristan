import {getDb, makeQuery} from '../db/index.js';

function singleimageGet(req, res){
    var dbo = getDb();
    var query = {};
    var projection = {};
    var result_image = {};
    var num = 0;  
    makeQuery(function(err, result) {
        if (err) throw err;
        if (req.params.selectedImageNum === 0){
            num = '0';
        }
        else if (req.params.selectedImageNum === result.length-1){
            num = (result.length-1).toString()
        }
        else {
            num = req.params.selectedImageNum.toString();
        }
        for (const facsimile of result){
            if (num === facsimile['num']){
                result_image = {src: facsimile["url"], id: facsimile["name"], num: facsimile["num"], polygons: []};
                for (const key in facsimile){
                    if(key!=='_id' && key!=='name' && key!=='url' && key!= 'notes' && key != 'num'){
                        result_image["polygons"] = result_image["polygons"].concat(facsimile[key]);
                    }
                }
            }
        }
        res.send(JSON.stringify(result_image)); 
    }, dbo, query, projection);

}

export default singleimageGet;
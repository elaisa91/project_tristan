const mongoUtil = require('mongoUtil');
const express = require('express');
const app = express();
const port = 8080;

app.use( '/' , express.static( '../app_prova/build/' ) );

mongoUtil.connectToServer( function( err, db ) {
    if (err) throw err;
    var dbo = mongoUtil.getDb();

   
    app.get('/imgTags', (req, res) => { 
        
       
        dbo.collection("facsimile_img_1").find({}).toArray(function(err, result) {
            if (err) throw err;
            var persons = [];
            for (const facsimile of result){
                var individuals = facsimile["individual"];
                
                for (const person of individuals){
                   
                    if (!persons.includes(person['subcategory'])){
                        persons.push(person['subcategory']);
                    }
                }
            }
            res.send(persons);   
            
        });
    });

    app.get('/imgResults/:selectedOption', (req, res) => {
    
        dbo.collection("facsimile_img_1").find().toArray(function(err, result) {
            if (err) throw err;
            var result_images = [];
            for (const facsimile of result){
                var found = false;
                var key = 0;
                while (found === false && key < Object.keys(facsimile).length){
                    
                    var category = facsimile[key];
                    console.log(category);
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
                    for (const key in Object.keys(facsimile).slice(3)){
                        var category = facsimile[key];
                        polygons=polygons.concat(polygons,category);
                    var image = {src: facsimile["url"], id: facsimile["name"], polygons: polygons}
                    result_images.push(image);
                    }
                }
            }
            console.log(result_images);
            res.send(result_images);  

            
        });
    });
  
});
    
app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
});
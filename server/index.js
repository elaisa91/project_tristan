const mongoUtil = require('mongoUtil');
const express = require('express');
const app = express();
const port = 8080;

app.use( '/' , express.static( '../app_prova/build/' ) );

mongoUtil.connectToServer( function( err, db ) {
    if (err) throw err;
    var dbo = mongoUtil.getDb();

   
    app.get('/imgTags', (req, res) => { 
       
        dbo.collection("facsimile_img").find({}).toArray(function(err, result) {
            if (err) throw err;
            var persons = [];
            for (const facsimile of result){
                var individuals = facsimile["personCategories"]["individuals"];
                for (const person of Object.keys(individuals)){
                    if (!persons.includes(person)){
                        persons.push(person);
                    }
                }
            }
            res.send(persons);   
            
        });
    });

    app.get('/imgResults/:selectedOption', (req, res) => {
    
        dbo.collection("facsimile_img").find().toArray(function(err, result) {
            if (err) throw err;
            var result_images = [];
            for (const facsimile of result){
                var individuals = facsimile["personCategories"]["individuals"];
                if (Object.keys(individuals).includes(req.params.selectedOption)){
                    var image = {src: facsimile["url"], id: facsimile["name"], polygons: individuals};
                    result_images.push(image);
                }
            }
            res.send(result_images);   
            
        });
    });
  
});
    
app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
});

  

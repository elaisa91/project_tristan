import Express from 'express';
import categoriesGet from './categories.js';
import subcategoriesGet from './subcategories.js';
import imagesGet from './images.js';
import connectToServer from '../db/index.js';
var router = Express.Router();

connectToServer( function( err, db ) {
    if (err) throw err;
    router.get('/categories', categoriesGet);
    router.get('/subcategories/:selectedCategory', subcategoriesGet);
    router.get('/imgResults/:selectedOption', imagesGet);
});

export default router;







import Express from 'express';
import individualsGet from './individuals.js';
import imagesGet from './images.js';
import connectToServer from '../db/index.js';
var router = Express.Router();

connectToServer( function( err, db ) {
    if (err) throw err;
    router.get('/individuals', individualsGet);
    router.get('/imgResults/:selectedOption', imagesGet);
});

export default router;







import Express from 'express';
import router from './v1/index.js';
import cors from 'cors';

const app = Express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/v1', router);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});



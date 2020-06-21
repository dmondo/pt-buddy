import express from 'express';
import morgan from 'morgan';
import parser from 'body-parser';
import path from 'path';
import router from './router';
import scheduler from './sms/scheduler';

const app = express();

app.use(express.static(path.join(__dirname, '..')));
app.use(morgan('dev'));
app.use(parser.json());
app.use(router);

const port = process.env.PORT || 1444;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

setInterval(scheduler, 60000);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config');
const port = config.port;

require('./db')();
const { notFound } = require('boom');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('cors')());

app.use((req, _res, next) => {
    console.log(`${new Date()} ${req.ip}:${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
});

app.use('/api', require('./routes'));

app.use((_req, _res, next) => {
    next(notFound('Not found'));
});

app.listen(port, () => {
    console.log('Listen on ' + port);
});

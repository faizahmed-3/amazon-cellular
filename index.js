const winston = require('winston');
const express = require('express');
const app = express();

app.use(express.static('public'));

require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

app.listen(3000, 'localhost', () => {
    winston.info(`Listening at port 3000.....`);
});
const winston = require('winston');
const express = require('express');
const app = express();

app.use(express.static('public'));

require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening at port ${port}.....`);
});
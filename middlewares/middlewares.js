const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });


exports.urlencodedParser = urlencodedParser;
const config = require('config');

module.exports = function () {
    if (!config.get('JWTKEY')) {
        throw new Error('FATAL ERROR: jwt key is not defined.\n*** Run the following in terminal: set JWTKEY=mykey');
    }
}
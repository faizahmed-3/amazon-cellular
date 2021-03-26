const config = require('config');

module.exports = function () {
    if (!config.get('jwtKey')) {
        throw new Error('FATAL ERROR: jwt key is not defined.\n*** Run the following in terminal: export jwtKey=mykey');
    }
}
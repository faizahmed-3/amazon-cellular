const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb+srv://faiz:faiz123@amazon-db.qmd2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(() => winston.info('Connected to Amazon Cellular DB successfully...'))
}
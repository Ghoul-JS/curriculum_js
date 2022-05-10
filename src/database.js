const mongoose = require('mongoose');

URI = ('mongodb://localhost/ensayo');

mongoose.connect(URI)
    .then(db => console.log('Database coneted!'))
    .catch(error => console.log(error));

module.exports = mongoose;
const mongoose = require('mongoose');
console.log('mongodb://localhost:27017/test');
module.exports = () => {
    //mongoose.Promise = global.Promise;
    mongoose.connect(('mongodb://localhost:27017/test'), { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
};
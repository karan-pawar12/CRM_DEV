const mongoose = require('mongoose');

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
};

const connect = async(url) =>{
    return new Promise(async(resolve,reject)=>{
        const connection = await mongoose.createConnection(url,mongooseOptions).asPromise();
        resolve(connection);
    })
}

module.exports = {
    connect
}
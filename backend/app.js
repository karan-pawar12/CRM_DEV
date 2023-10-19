const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
};
const mongooseConnectionString = "mongodb://localhost:27017/crm";

// Parse JSON requests
app.use(bodyParser.json());

// Parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

//middlewares
app.use(express.json());


//cors 
app.use(cors());

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');








//Routes
// app.use('/',indexRouter);
// app.use('/users',usersRouter);
app.use('/admin',adminRouter);


//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


//mongodb connection instance
mongoose
  .connect(mongooseConnectionString, mongooseOptions)
  .then(() => {
    console.log("Mongoose connection established with pid : " + process.pid);
})
  .catch((err) => {
    console.log(err.message);
  });


app.listen(5000,()=> {
    console.log("Port Connected");
})
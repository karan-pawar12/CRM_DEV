const fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, './config/appConfig.json');


global.appConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const Socket = require('socket.io').Server;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc  = require('swagger-jsdoc');
//Swagger api config
const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"Crm Web Application",
            description:"Developed by vkvtech"
        },
        servers:[
            {
                url:"http://localhost:5000"
            }
        ]
    },
    apis:['routes/admin.js']
}
const spec = swaggerJsdoc(options);


const adminRouter = require('./routes/admin');


const app = express();






app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin',adminRouter);
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec));




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;  
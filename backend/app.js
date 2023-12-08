const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan')
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './config/appConfig.json');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc  = require('swagger-jsdoc');

const app = express();

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


// Use morgan logger
app.use(logger('dev'));

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
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(spec));


//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});




global.appConfig = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

app.listen(5000,()=> {
    console.log("Port Connected");
})
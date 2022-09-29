const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var hbs = require('hbs');
var path = require('path');
var helpers = require('./server/components/hbshelpers');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



//Helpers
hbs.registerPartials(path.join(__dirname,'views/partials'),(err)=>{});
/*for(let helper in helpers){
    hbs.registerHelper(helper, helpers[helper]);
}*/


//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Parse application/json
app.use(bodyParser.json());

//Static Files
app.use(express.static('public'));

//Template Engine
app.engine('hbs',exphbs.engine( {extname: 'hbs'} ));
app.set('view engine','hbs');

//Connection Pool

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

//Connect to DB
pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
});

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));


    
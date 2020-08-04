const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require("passport");
const passportLocal = require('./config/passport-local-strategy.js');
const mongoStore = require('connect-mongo')(session);
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
// extract layout and script
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'coedial',
    secret:'RandomKeyForNow',
    saveUninitialized:false,
    cookie:{
        maxAge: (1000*60*10)
    },
    store:new mongoStore(
        {
            mongooseConnection:db,
            autoRemove:false
        },(err)=>{
            console.log(err || 'connection mongoStore OK');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./router'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in server:${err}`);
    }
    console.log(`server running on port:${port}`);
});
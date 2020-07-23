const express = require('express');
const app = express();
const port = 8000;
app.use('/',require('./router'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in server:${err}`);
    }
    console.log(`server running on port:${port}`);
});
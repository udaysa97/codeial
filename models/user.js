const mongoose = require('mongoose');
const { use } = require('../router');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true

    }
},{timeStamps:true});

const user = mongoose.model('user',userSchema);
module.exports = user;
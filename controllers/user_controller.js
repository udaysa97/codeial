const user = require('../models/user');

module.exports.home = (req,res)=>{
    return res.render('user',{
        title: "usr page",
        udaynameparam:"Uday acharya"
    });
};

module.exports.signup = (req,res)=>{
    return res.render('user-sign-up',{
        title:'coedial-signup'
    });
};

module.exports.signin = (req,res)=>{
    return res.render('user-sign-in',{
        title:'coedial-signin'
    });
};

module.exports.create = (req,res)=>{
    if(req.body.password !== req.body.password_check){
        return res.redirect('back');
    }
    user.findOne({email:req.body.email},(err,exist)=>{
        if(!exist){
            user.create(req.body,(err,users)=>{
                if(err){
                    console.log('Error creating user');
                    return;
                }
                return res.redirect('users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
};




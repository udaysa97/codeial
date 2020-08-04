const user = require('../models/user');

module.exports.home = (req,res)=>{
    return res.render('user',{
        title: "usr page"
       
    });
};

module.exports.signup = (req,res)=>{
    return res.render('user-sign-up',{
        title:'coedial-signup'
    });
};

module.exports.signin = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    return res.render('user-sign-in',{
        title:'coedial-signin'
    });
};

module.exports.create = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/home');
    }
    if(req.body.password !== req.body.password_check){
        return res.redirect('back');
    }
    console.log(req.body);
    user.findOne({email:req.body.email},(err,exist)=>{
        if(!exist){
            user.create(req.body,(err,users)=>{
                if(err){
                    console.log('Error creating user');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
};

module.exports.createSession = (req,res)=>{
    return res.redirect('/');
};

module.exports.destroySession = (req,res)=>{
    req.logout();
    return res.redirect('/');
}




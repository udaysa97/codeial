const user = require('../models/user');

module.exports.profile = (req,res)=>{
   // return res.render('user',{
    //    title: "usr page",
   //     udaynameparam:"Uday acharya"
  //  });
    console.log('+++++++++++++++++++++++++++++++++++'+req.cookies.user_id);
    if(req.cookies.user_id){
        console.log('No error yet');
        user.findById(req.cookies.user_id,(err,users)=>{
            if(err){
                console.log('Error while sign in');
                return;
            }
            if(users){
                return res.render('user',{
                    title:"user Profile",
                    udaynameparam:users.name,
                    userDetail:users
                });
            }
            else{
                console.log('mmmmm'+users)
                return res.redirect('sign-in');
            }
        });
    }
}

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
                return res.redirect('sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
};

module.exports.createSession = (req,res)=>{
    user.findOne({email:req.body.email},(err,users)=>{
        if(err){
            console.log("DB error while finding");
        }
        if(users){
            
            if(users.password != req.body.password){
                console.log("incorrect pass");
                return res.redirect('back');
            }
            console.log("corr pass");
            res.cookie('user_id',users._id);
            console.log("cookieSet");
            return res.redirect('/users/user');
        }
        else{
            console.log("No user found");
            return res.redirect('back');
        }
    });
};






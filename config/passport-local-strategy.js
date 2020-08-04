const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField:'email'
},(email,password,done)=>{
     User.findOne({email:email},(err,user)=>{
         if(err){
             console.log("Error in passport in strategy.js");
             return done(err);
         }
         if(!user || user.password !== password){
             console.log("Invalid pass found inside strategy.js");
             return done(null,false);
         }
         return done(null,user);
     });
}));

// Might throw error
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log("Error in deserialize strategy.js");
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication= (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = (req,res,next)=>{
    // Anyhow let user go to next() page but in case authenticated set the user variable in locals.
    if(req.isAuthenticated()){   
        console.log('YEEEEEEEEEEEEEEES');
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
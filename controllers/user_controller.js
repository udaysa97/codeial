module.exports.home = (req,res)=>{
    return res.render('user',{
        title: "usr page",
        udaynameparam:"Uday acharya"
    });
};

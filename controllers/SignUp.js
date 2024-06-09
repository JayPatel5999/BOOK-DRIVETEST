module.exports = async(req,res)=>{
    res.render('signup',{RegError:req.flash('RegError')});
}
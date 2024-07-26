
module.exports= async (req,res)=>{
    console.log('inside lougout: '+res.locals.user);
    req.session.destroy(()=>{
        res.redirect('/')
    });
    
    //res.send('logged out')
    
}

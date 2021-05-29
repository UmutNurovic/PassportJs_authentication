const oturumAcilmis =function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error',['Lütfen once oturum açın']);
        res.redirect('/login');
    }
}
const oturumAcilmamis =function(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/home');
    }
}

module.exports = {
    oturumAcilmis,
    oturumAcilmamis
}
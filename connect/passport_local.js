const LocalStrategy = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports = function(passport){
const option ={
    usernameField:'email',
    passwordFiled:'password'
}
passport.use(new LocalStrategy(option ,async(email,password,done)=>{
    try {
        const _bulunanUser = await User.findOne({email:email});
        if(!_bulunanUser){
            return done(null,false,{message:'email yanlış'});
        }
        const sifreKontrol = await bcrypt.compare(password,_bulunanUser.password);
        if(!sifreKontrol){
            return done (null,false ,{message:'sifre hatalı'});
        }
        else{
            if(_bulunanUser){
                return done (null,_bulunanUser);
            }
        }
    } catch (error) {
        return done(error);
    }
}));
passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
   
    User.findById(id,function(err,user){
        const yeniUser = {
            email:user.email,name:user.name,surname:user.surname,id:user.id
        }
        done(err,yeniUser);
});
    
});
}
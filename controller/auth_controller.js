const User = require('../models/user');
const {validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../connect/passport_local')(passport);



const registerPost = async (req,res)=>{
    const hatalar = validationResult(req)
    if(!hatalar.isEmpty()){
        req.flash('validation_error',hatalar.array());
        req.flash('name',req.body.name);
        req.flash('surnaöe',req.body.surname);
        req.flash('email',req.body.email);
        req.flash('pasword',req.body.password);
        res.redirect('/register'); 

    }else{
        try {
            const _user = await User.findOne({email:req.body.email});
            if(_user){
                req.flash('validation_error',[{msg: "Bu mail kullanımda"}]);
                req.flash('email',req.body.email);
                req.flash('ad',req.body.ad);
                req.flash('soyad',req.body.soyad);
                req.flash('sifre',req.body.sifre);
                req.flash('Rsifre',req.body.Rsifre);
                res.redirect('/register'); 
            }else{
                const newUsers = new User({
                    name:req.body.name,
                    surname:req.body.surname,
                    email:req.body.email,
                    password:await bcrypt.hash( req.body.password,10)
                });
                 await newUsers.save();
                res.redirect('login');
            }
        } catch (error) {
            console.log(error);
        }
    }
  
}

const loginPost = (req,res,next)=>{
    const hatalar = validationResult(req);
    req.flash('email',req.body.email);;
    req.flash('password',req.body.password);
    if(!hatalar.isEmpty()){
        req.flash('validation_error',hatalar.array());
        res.redirect('/login');    
    }
else{
    passport.authenticate('local',{
        successRedirect:'/home',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
}
    
}




module.exports={
    registerPost,
    loginPost
}
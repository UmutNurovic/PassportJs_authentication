const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const passport = require('passport');
const expressLayouts= require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');



// connection database
require('./connect/db_connect');

app.use(expressLayouts)
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.validation_error =req.flash('validation_error');
    res.locals.name = req.flash('name');
    res.locals.surname = req.flash('surname');
    res.locals.email = req.flash('email');
    res.locals.password = req.flash('password');

    res.locals.login_error = req.flash('error');
    next();
});

//passport transactions
app.use(passport.initialize());
app.use(passport.session());

//routers
const authRouther = require('./router/rotuers');
app.use(authRouther);

app.listen(process.env.PORT,()=>{
    console.log(`strat to server ${process.env.PORT}`);
})




const router =require('express').Router();
const auth_controller = require('../controller/auth_controller');
const validateMiddleWare = require('../middleware/validationMiddleware');
const auth_Middleware = require('../middleware/auth_middleware');

router.get('/register',auth_Middleware.oturumAcilmamis,(req,res)=>{res.render('register',{layout:'./layout/auth_layout.ejs'});});
router.post('/register',auth_Middleware.oturumAcilmamis,validateMiddleWare.validationNewUser(),auth_controller.registerPost);

router.get('/login',auth_Middleware.oturumAcilmamis,(req,res)=>{res.render('login',{layout:'./layout/auth_layout.ejs'});});
router.post('/login',auth_Middleware.oturumAcilmamis,validateMiddleWare.validateLogin(),auth_controller.loginPost);


router.get('/home',(req,res)=>{res.render('home',{layout:'./layout/auth_layout.ejs'});});




module.exports = router;
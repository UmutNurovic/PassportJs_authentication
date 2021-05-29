const {body} = require('express-validator');

const validationNewUser = ()=>{
  return[
    body('name')
    .trim()
    .isLength({min:3}).withMessage('name 3 karakterden uzun olmalıdır')
    .isLength({max:20}).withMessage('name 20 karakterden fazla olamaz'),

    body('surname')
    .trim()
    .isLength({max:20}).withMessage('surname 20 karakterden fazla olamaz'),

    body('email')
    .isEmail()
    .trim(),

    body('password')
    .trim()
    .isLength({min:4}).withMessage('şifreniz 4 karakterden uzun olmalıdır')
  ];
}

const validateLogin = ()=>{

  return [
      body('email')
      .trim()
      .isEmail().withMessage('Geçerli bir mail giriniz'),

      body('password')
      .trim()
      .isLength({min:4}).withMessage('sifre en az 4 karakter olmalı')
      .isLength({max:20}).withMessage('sifre en fazla 20 karakter olur'),

     

  ];
}

module.exports ={
    validationNewUser,
    validateLogin
}
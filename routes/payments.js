const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Product = require('../models/product');
const Individualcourse = require('../models/individualcourse');
var Cart = require('../models/cart');
var Order = require('../models/order');

router.get('/init', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function(err, docs) {
      var productChunks = [];
      var chunkSize = 4;
      for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
      }
      res.render('shop/index', { title: 'Shooping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
    });
  });
  
  router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    Product.findById(productId, function(err, product) {
      if(err) {
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
  });
  
  router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceByOne(productId);
    req.session.cart;
    res.redirect('/shopping-cart/');
  });
  
  router.get('/remove/:id', function(req, res, next) {
  
  });
  
  router.get('/shopping-cart', function(req, res, next) {
    if(!req.session.cart) {
      return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    return res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
  });
  
 // router.get('/checkout', isLoggedIn, function(req, res, next) {
    router.get('/checkout', function(req, res, next) {
    if(!req.session.cart) {
      return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    return res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
  
  });
  
  //router.post('/checkout', isLoggedIn, function(req, res, next) {
    router.post('/checkout', function(req, res, next) {
      console.log(req.body);
    // if(!req.session.cart) {
    //   return res.redirect('/shopping-cart');
    // }
    // var cart = new Cart(req.session.cart);
    var stripe = require("stripe")(
        "sk_test_TKDvsKDW0GYDvfrn7nkqvBE0"
    );

    stripe.tokens.create(
      {
        card: {
          number: '4242424242424242',
          exp_month: 11,
          exp_year: 2020,
          cvc: '314',
        },
      
    
  }, function(err, token) {
    if(err) {
      console.log(err);
      // //req.flash('error', err.message);
      // return res.redirect('/checkout');
    }

    console.log("token ID");
    
    console.log(token.id);

    
    stripe.charges.create({
      //amount: cart.totalPrice * 100,
      amount: 1 * 100,
      currency: "usd",
      source: token.id, // obtained with Stripe.js
      description: "TwinTees Charge!"
    }, function(err, charge) {
      if(err) {
        console.log(err);
        //req.flash('error', err.message);
        //return res.redirect('/checkout');
      }
      console.log("payment ID:")
      console.log(charge);
    });
  });

console.log("payment completed;receipt page can be redirected if needed");
  return res.redirect('/');


//     Publishable key
// pk_test_fCuxHOHdiDZnywejJQZjGeG3


// Secret key
// sk_test_TKDvsKDW0GYDvfrn7nkqvBE0
  
    // stripe.charges.create({
    //   //amount: cart.totalPrice * 100,
    //   amount: 1 * 100,
    //   currency: "usd",
    //   source: stripeToken, // obtained with Stripe.js
    //   description: "TwinTees Charge!"
    // }, function(err, charge) {
    //   if(err) {
    //     console.log(err);
    //     //req.flash('error', err.message);
    //     //return res.redirect('/checkout');
    //   }
    //   console.log("payment ID:")
    //   console.log(charge);
    // });
      //return res.redirect('/');
      // var order = new Order({
      //   user: req.user,
      //   cart: cart,
      //   address: req.body.address,
      //   name: req.body.name,
      //   paymentId: charge.id
      // });
      // order.save(function(err, result){
      //   if(err) {
      //     req.flash('error', err.message);
      //     return res.redirect('/checkout');
      //   }
      //   req.flash('success', 'Successfully bought product!');
      //   req.session.cart = null;
      //   res.redirect('/');
      // });
    //});
  });
  
  module.exports = router;
  
//   function isLoggedIn(req, res, next) {
//     if(req.isAuthenticated()) {
//       return next();
//     }
//     req.session.oldUrl = req.url;
//     res.redirect('/user/signin');
  
//   }
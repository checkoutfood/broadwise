const mongoose = require('mongoose');
const config = require('../config/database');
const card = require('../models/card');
const billingAddress = require('../models/billingAddress');

// Schema
const paymentSchema = mongoose.Schema({
    transactionId: {
        type: String,required: true
    },
    paymentDate:{
        type:String,required: true
    },
    paymentTime:{
        type:String,
        required: true
    },
    profileEmail: {
        type: String,
        required: true
    },
    currentselection: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    // card: {
    //     type: card,
    //     required: true
    // },
    // billingAddress: {
    //     type: billingAddress,
    //     required: true
    // },
    stripeToken: {
        type: String
     
    },
    stripeCharge: {
        type: String
       
    },
    stripeTokenError: {
        type: String
     
    },
    stripeChargeError: {
        type: String
       
    },
    tokenId: {
        type: String
       
    },
    cardId: {
        type: String
       
    },
    cardBrand: {
        type: String
       
    },
    cardCountry: {
        type: String
       
    },
    paymentChargeId: {
        type: String
       
    },
    chargeApplicationFeeAmount: {
        type: String
       
    },
    paymentChargeDescription: {
        type: String
       
    },

    chargeSellerMessage: {
        type: String
       
    },

    chargeOutcomeType: {
        type: String
       
    },

    paymentChargeReceiptURL: {
        type: String
       
    },

    paymentChargeStatus: {
        type: String
       
    }
   
});



const Payment = module.exports = mongoose.model('Payment', paymentSchema);

module.exports.addPayment = function (newPayment, callback) {
    newPayment.save(callback);
       
}


// module.exports.getPaymentByPaymentChargeId = function(paymentChargeId, callback){
//     const query = {paymentChargeId: paymentChargeId}
//     Payment.findOne(query, callback);
//   }

// module.exports.editPayment = function (oldPaymentID,newPayment, callback) {
//     const query = { _id: oldPaymentID }
//     Payment.findByIdAndUpdate(query,newPayment, callback);

// }

// module.exports.removePayment = function (paymentID, callback) {
//     const query = { _id: paymentID };
//     Payment.remove(query, callback);

// }

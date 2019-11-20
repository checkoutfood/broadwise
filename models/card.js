const mongoose = require('mongoose');
const config = require('../config/database');


const CardSchema = mongoose.Schema({
    type: {
        type: String,required: true
    },
    ccname:{
        type:String,required: true
    },
    ccnumber:{
        type:String,
        required: true
    },
    ccexpiration_month: {
        type: Number,
        required: true
    },
    ccexpiration_year: {
        type: Number,
        required: true
    },
    cccvv: {
        type: String,
        required: true
    },
});

const Card = module.exports = mongoose.model('Card', CardSchema);
const crypto = require('crypto').randomBytes(256).toString('hex'); 
// Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

module.exports = {
  database: "mongodb+srv://checkoutfood:checkoutfood123@cluster0-5ffrd.mongodb.net/broadwiseTest?retryWrites=true",
  secret: crypto,
  db: "broadwiseTest"
}
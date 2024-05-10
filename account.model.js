const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: String,
  server: String,
  status: String
});

const Accounts = mongoose.model('accounts', accountSchema);

module.exports = { Accounts };
const Activity = require('./Activity');
const Certification = require('./Certification');
const Chapter = require('./Chapter');
const Flashcard = require('./Flashcard');
const Notecard = require('./Notecard');
const PaymentMethod = require('./paymentMethod');
const Quiz = require('./Quiz');
const Transaction = require('./Transaction');
const User = require('./User');

// Export all models as an object
module.exports = {
  Activity,
  Certification,
  Chapter,
  Flashcard,
  Notecard,
  PaymentMethod,
  Quiz,
  Transaction,
  User
};

// module.exports = { User };
    // not sure if this update is what we need to the models' index.js -- temporarily commented out, above's module.exports...


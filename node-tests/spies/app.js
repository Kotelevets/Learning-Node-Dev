let db = require('./db.js');

module.exports.handleSignUp = (email, password) => {
  // Check if email already exists
  
  // Save the user to the database
  db.saveUser({
    email,    // equal to {email: email, password: password} inside ES6,
    password  // if the property name in an object you're setting is the
              // same as the variable name
  });
  
  // Send the welcome email
  
};

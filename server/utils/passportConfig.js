// passportConfig.js
// NOTE this file may be removed
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { compareHashedText } = require('./../utils/hashing');
const pool = require('../utils/pool');

// // Verifying function for local strategy
async function verifyingFunction(username, password, done) {
  console.log('Verifying user...');
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (!result.rows.length) {
      return done(null, false, { message: 'Username not found' });
    }

    const isValid = await compareHashedText(result.rows[0].password, password);
    if (!isValid) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    return done(null, result.rows[0]);
  } catch (e) {
    return done(e);
  }
}

// Serialize user
passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

// Deserialize user
passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});

// Local Strategy
const strategy = new LocalStrategy(verifyingFunction);
passport.use(strategy);

module.exports = passport;

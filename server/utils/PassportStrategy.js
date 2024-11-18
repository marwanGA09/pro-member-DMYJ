const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('./pool');
const { compareHashedText } = require('./hashing');
const catchAsync = require('./catchAsync');

async function verifyingFunction(username, password, done) {
  console.log('IIIIIIIIIIIIIIIIIII');
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    console.log('result.rows', result.rows);
    if (!result.rows.length) {
      return done(null, false, { message: 'User not found' });
    }

    const isValid = await compareHashedText(result.rows[0].password, password);
    if (!isValid) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    return done(null, result.rows);
  } catch (e) {
    return done(e);
  }
}

const Strategy = new LocalStrategy(verifyingFunction);
passport.use(Strategy);

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});
// module.exports = Strategy;

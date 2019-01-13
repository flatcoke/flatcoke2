const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy; // 이 부분 추가

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CLIENT_URL + "/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, done);
    return done(null, { username: 'flatcoke' });
    // asynchronous verification, for effect...
    // process.nextTick(function () {

    //   // To keep the example simple, the user's Google profile is returned to
    //   // represent the logged-in user.  In a typical application, you would want
    //   // to associate the Google account with a user record in your database,
    //   // and return that user instead.
    //   return done(null, profile);
    // });
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.CLIENT_URL + "/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile, cb);
    return cb(null, profile)
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

app.prepare()
  .then(() => {
    const server = express()
    server.use(passport.initialize());

    server.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'email'] }),
      (req, res) => {
      })

    server.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login',
        session: false
      }),
      function (req, res) {
        console.log(req.query);
      });

    server.get('/auth/facebook',
      passport.authenticate('facebook', { scope: ['public_profile', 'email'] }),
      (req, res) => {
      });

    server.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login',
        session: false
      }),
      function (req, res) {
        // Successful authentication, redirect home.
        console.log('-------------')
        res.redirect('/');
      });

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

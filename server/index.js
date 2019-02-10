import express from 'express'
import next from 'next'

import APIRoute from 'routes'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import db from 'models'

const { User } = db.models
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './client', dev })
const handle = app.getRequestHandler()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { provider, id, displayName, emails } = profile
      const user = await User.findOrCreateByOAuth({
        provider,
        email: emails[0].value,
        username: displayName.split(' ').join(''),
        uid: id,
      })
      return done(null, user)
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/auth/facebook/callback`,
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile)
    }
  )
)

app.prepare().then(() => {
  const server = express()
  server.use(passport.initialize())
  server.use('/api', APIRoute)

  server.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['openid', 'email'] }),
    () => {}
  )

  server.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      // set cookie jwt token
      res.redirect('/')
    }
  )

  server.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] }),
    () => {}
  )

  server.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      res.redirect('/')
    }
  )
  server.get('/blogs/:id', (req, res) => {
    return app.render(req, res, '/blogs/id', { id: req.params.id })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on ${process.env.CLIENT_URL}`)
  })
})

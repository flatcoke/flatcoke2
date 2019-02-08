import express from 'express'
import next from 'next'

import APIRoute from 'routes'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

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
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
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
      successRedirect: '/',
      failureRedirect: '/login',
      session: false,
    }),
    () => {}
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

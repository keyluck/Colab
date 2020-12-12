const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    var callbackVar
    if(process.env.NODE_ENV === 'development') {
        callbackVar = 'http://localhost:3000/auth/google/callback'
    } else {
        callbackVar = 'https://co-lab-app.herokuapp.com/auth/google/callback'
    }
    
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: callbackVar,
            },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }


        try {
            let user = await User.findOne({ googleId: profile.id})

            if(user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (err) {
            console.error(err)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}
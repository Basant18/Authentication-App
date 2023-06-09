const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const env = require('../config/environment');
const crypto = require('crypto');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // find a user
            let user = await User.findOne({email: profile.emails[0].value});
            console.log(profile);
            if(user)
            {
                // if found, set this user as req.user
                return done(null, user);
            }
            else{
                // if not found, create the user and set it as req.user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null,user);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    }
));

module.exports = passport;
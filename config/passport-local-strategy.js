const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    //passReqToCallback: true
    },
    async (email,password,done) => {
        try{
            let user = await User.findOne({email: email});
            if(!user)
            {
                //req.flash('error', 'Invalid Username/Password');
                return done(null,false);
            }
            await bcrypt.compare(password, user.password, (error, isMatch) => {
                if(error)
                {
                    throw error;
                }
                if(!isMatch)
                {
                    //req.flash('error', 'Invalid Username/Password');
                    return done(null, false);
                }
            });
            return done(null,user);
        }catch(err){
            //req.flash('error', err);
            console.log('Error in finding user ---> passport');
            return done(err);
        }
    }
));

// serializing the user to decide which key to be kept in cookie
passport.serializeUser((user,done) => {
    done(null, user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser(async (id,done) => {
    try {
        let user = await User.findById(id);
        return done(null,user);
    } catch (err) {
        //req.flash('error','Error in finding user in passport');
        return done(err);
    }
});

// check if user is authenticated
passport.checkAuthentication = (req,res,next) =>{
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/user/signIn');
}

passport.setAuthenticatedUser = (req, res, next) =>{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
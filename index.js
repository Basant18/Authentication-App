const express = require('express');
const env = require('./config/environment');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//middlewares
app.use(express.urlencoded({extended: true}));

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract styles and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in db
app.use(session({
    name: 'nodejs_auth',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled',
    },(err) => {console.log(err || 'connect mongo-db connection ok')})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(env.PORT, function(err){
    if(err)
    {
        console.log('Error while running ',err);
        return;
    }
    console.log(`App running on port ${env.PORT}`);
});
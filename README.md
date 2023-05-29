# Technology Stack

Express, EJS, Kue, NodeMailer, Passport, Passport-Local, Passport-GoogleOAuth, Express-Session, Mongoose, Redis

# About Authentication-App

1. Authenticon App using which user can signup and signin using express session and passport middleware.
2. SignIn use 2 strategies Local and Google OAuth Strategy.
3. User can reset password.
4. Parallel Jobs for sending mails o user for forgot password.

# Setup Project

1. Install npm and then all its packages after making a clone using : 
```
npm install
```

2. Install Redis in your sysytem and then run 
 ```
 redis-server
 ```
 on the console.
 
 3. Run the sass to load the stylesheets
 ```
 npm run sass
 ```
 4. Run the project
 ```
 npm start
 ```
 
 # Directory Structure
 
 ```
 Authentication-App
    |-----assets
    |       |--- css
    |       |     |-- email_verify.css
    |       |     |-- header.css
    |       |     └-- layout.css
    |       |     |-- user_signin.css
    |       |     |-- user_signup.css
    |       |
    |       |--- sass
    |             |-- email_verify.scss
    |             |-- header.scss
    |             └-- layout.scss
    |             |-- user_signin.scss
    |             |-- user_signup.scss
    |------ config
    |         └--- mongoose.js
    |         |--- kue.js
    |         |--- middleware.js
    |         |--- mongoose.js
    |         |--- nodemailer.js
    |         |--- passport-google-oauth-strategy.js
    |         |--- passport-local.js
    |
    |------ controllers
    |         └--- home_controllers.js
    |         |--- user_controller.js
    |
    |------ models
    |         └--- user.js
    |         |--- token.js
    |
    |------ routes
    |         └--- index.js
    |         |--- user.js
    |
    |------ mailers
    |         |--- reset_password_mailer.js
    |
    |------ views
    |         |--- mailers
    |         |      |--- reset
    |         |              |--- reset_password.js
    |         |--- _header.ejs
    |         |--- home.ejs
    |         └--- layout.ejs
    |         |--- email_verify.ejs
    |         |--- reset_password_form.ejs
    |         |--- user_signin.ejs
    |         |--- user_signup.ejs
    |
    |------ .gitignore
    |------ index.js
    |------ package.json
    |------ package-lock.json
    └------ README.md
```

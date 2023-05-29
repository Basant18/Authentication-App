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
 
 Authentication-App
    |-----assets
    |       |--- css
    |       |     |-- habit.css
    |       |     |-- home.css
    |       |     └-- layout.css
    |       |--- js
    |       |     |-- habit.js
    |       |     └-- moment.js
    |       |--- sass
    |             |-- habit.scss
    |             |-- home.scss
    |             └-- layout.scss
    |------ config
    |         └--- mongoose.js
    |------ controllers
    |         └--- habit_controllers.js
    |------ models
    |         └--- habit.js
    |------ routers
    |         └--- index.js
    |------ views
    |         |--- habit..ejs
    |         |--- home.ejs
    |         └--- layout.ejs
    |------ .gitignore
    |------ app.js
    |------ package.json
    |------ package-lock.json
    └------ README.md


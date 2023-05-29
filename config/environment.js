const development = {
    PORT: 8001,
    saltRounds: 10,
    db: 'nodejs_authentication',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'email',
            pass: 'password'
        }
    },
    session_cookie_key: 'blahblahblah',
    google_client_id: "your google client id",
    google_client_secret: "your google client sercret",
    google_call_back_url: "your google callback url"
};

module.exports = development;

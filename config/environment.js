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
            user: 'bsntsngh16@gmail.com',
            pass: 'swhuxzeileadmdog'
        }
    },
    session_cookie_key: 'blahblahblah',
    google_client_id: "548658330072-3ik37cggmgfv6sljg082gcge6h56ef0d.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8001/user/auth/google/callback"
};

module.exports = development;
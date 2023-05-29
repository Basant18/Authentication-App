const User = require('../models/user');
const bcrypt = require('bcrypt');
const env = require('../config/environment');
const fs = require('fs');
const Token = require('../models/token');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const queue = require('../config/kue');

module.exports.signUp = (req,res) =>{
    return res.render('user_signup',{
        title: 'Sign Up'
    });
}

module.exports.create = async(req,res) =>{
    try {
        if(req.body.password != req.body.confirm_password)
        {
            req.flash('error', 'Invalid password');
            return res.redirect('/user/signUp');
        }
        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            req.flash('error', 'User Already Exists');
            return res.redirect('/user/signIn');
        }
        await bcrypt.hash(req.body.password,env.saltRounds, async(error, hash) =>{
            if(error)
            {
                throw error;
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            req.flash('success', 'User Added');
        });
        return res.redirect('/user/signIn');
    } catch (err) {
        req.flash('error', err);
        return;
    }
}

module.exports.signIn = (req,res) =>{
    return res.render('user_signin',{
        title: 'Sign In'
    });
}

module.exports.createSession = (req,res) =>{
    req.flash("success","Login Successful!");
    return res.redirect('/');
}    

module.exports.destroySession = (req,res) =>{
    req.logout(err =>{
        if(err)
        {
            console.log("Error in logout ",err);
            return;
        }
        req.flash("success","Logout Successfull!");
        return res.redirect('/user/signIn');
    });
}

module.exports.emailVerify = (req,res) =>{
    return res.render('email_verify',{
        title: "Reset Password"
    });
}

module.exports.resetPassword = async function(req, res){
    try
    {
        let user = await User.findOne({email: req.body.email});
        if(!user)
        {
            console.log('EmailId doesnot exist');
            return;
        }
        let token = await Token.create({
            user: user._id,
            accessToken: crypto.randomBytes(32).toString("hex"),
            isValid: true
        });
        let token1 = await token.populate('user', 'email');
        // resetPasswordMailer.resetPassword(token);
        let job = queue.create('emails', token1).save(function(err){
            if(err)
            {
                console.log('Error in sending to the queue',err);
                return;
            }
            console.log('job enqueued', job.id);
        });
        // second parameter is for parallel processing of mail. Here we can have 5 queues running in parallel
        queue.process('emails', 5,function(job, done){
            console.log('emails worker is processing a job', job.data);
            resetPasswordMailer.resetPassword(job.data);
            done();
        });
        return res.redirect('back');
    }
    catch(err)
    {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.resetPasswordForm = function(req,res){
    console.log(req.params['accessToken']);
    return res.render('reset_password_form',{
        title: 'Codeial | Reset Password',
        accessToken: req.params.accessToken
    });
}

module.exports.createNewPassword = async function(req, res){
    const accessToken = req.params.accessToken;
    console.log(accessToken);
    if(req.body.password != req.body.confirm_password)
    {
        console.log('Wrong Password! Create new password');
        return;
    }
    try
    {
        let token = await Token.findOne({accessToken : accessToken});
        console.log('Token',token);
        let user = await User.findById({_id:token.user});
        console.log(user);
        await bcrypt.hash(req.body.password,env.saltRounds, async(error, hash) =>{
            if(error)
            {
                throw error;
            }
            user.password = hash;
            await user.save();
            await token.deleteOne();
            return res.redirect('/user/signIn');
        });
    }
    catch(err)
    {
        console.log(err);
        return;
    }
}
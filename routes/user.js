const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/signUp', userController.signUp);
router.post('/create', userController.create);
router.get('/signIn', userController.signIn);
router.post('/createSession', passport.authenticate('local',{failureRedirect: '/signIn'}), userController.createSession);
router.get('/auth/google', passport.authenticate('google',{scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: 'user/signIn'}), userController.createSession);
router.get('/signOut', userController.destroySession);
router.get('/emailVerify', userController.emailVerify);
router.post('/resetPassword', userController.resetPassword);
router.get('/resetPassword/:accessToken',userController.resetPasswordForm);
router.post('/createNewPassword/:accessToken',userController.createNewPassword);

module.exports = router;
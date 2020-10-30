var localStrategy = require('passport-local').Strategy;
var Promise = require('bluebird')
var User = require('../db/user')


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        if (!user.hasOwnProperty('username')) {
            done("no user in session yet");
        } else {
            done(null, user);
        }
    });

    passport.deserializeUser(function(user, done) {
        if (!user.hasOwnProperty('username')) {
            done('no user in seeeion yet');
        } else {
            done(null, user);
        }
    });

    //=========================================================
    //LOCAL LOGIN ============================================
    //=========================================================
    passport.use('local-login',new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done){
        let userinfo = {
            username: username,
            password: password
        };
        User.UserLogin(userinfo,function (err, user) {
            if (err) {
                console.log('wrong')
                return done(err);
            }
            if (!user) {
                console.log('not yet')
                return done(null, false, {message: "no"})
            }
            return done(null, user);
        })
    }
    ));

    passport.use('local-signup', new localStrategy({
            // usernameField: 'username',
            // passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            var email = req.body.email;
            let userinfo = {
                username: username,
                password: password,
                email: email
            };
           // console.log("sigup userinfo:", userinfo);
            User.UserSignUp(userinfo, function (err, user) {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        }));

}
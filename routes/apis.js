
var Utils = require('./utils')


module.exports = function(app, passport) {
  app.post('/signin',function(req,res,next){
    passport.authenticate('local-login', function(err, user, info) {
          if (err) {
              return next(err);
          }
          if (!user) {
              // return res.redirect('/signin');
              return res.json({
                  err_code: 1,
                  message: info
              });
          }
        return res.status(200).json({
            err_code: 0,
            message: "OK",
            data:{
              username: user.username
            }
        });
      })(req, res, next);
  })
};

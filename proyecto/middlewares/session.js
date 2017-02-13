/**
 * Created by juanma on 13/02/17.
 */
module.exports = function (req, res, next) {
  if(!req.session.user_id){
      res.redirect("/login")
  }
  else{
      next();
  }
};
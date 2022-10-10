const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log("auth");
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      return res.send("Login Again");
    }
    // console.log("decoded", decoded);
    req.body.user = decoded.id;
    next();
  });
};

module.exports = { authentication };

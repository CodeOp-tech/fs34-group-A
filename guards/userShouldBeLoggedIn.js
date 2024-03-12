var jwt = require("jsonwebtoken"); // i need the library
const models = require("../models");
require("dotenv").config(); 
const supersecret = process.env.SUPER_SECRET; // i need the super secret


/* 
The userShouldBeLoggedIn function is a middleware function that takes 
three parameters: req (request), res (response), and next (next middleware function).
Token Extraction: It extracts the JWT from the request headers. If no token is provided or if 
it doesn't start with "Bearer ", it sends a 401 (Unauthorized) response with a message asking 
the client to provide a token.
Token Verification: If a token is provided, it verifies its validity using the 
jsonwebtoken library's verify method. It uses the supersecret key to verify the token's 
signature. If verification fails, it sends a 401 response with the error message.
*/
function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");
  if (!token) { //if i didn't send a token, then kicked out
    res.status(401).send({ message: "Please provide a token" });
  } 
  try {//If i have a token, then it should be verified. Whether it works or not. 
    // Verify the JWT token
    const decoded = jwt.verify(token, supersecret);//the decoded object is what we signed in the auth.js {user_id}
    
    // Retrieve the user based on the decoded user_id
    const user = await User.findByPk(decoded.userId);//check userID

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Attach the user_id to the request object
    req.userId = decoded.userId;//check userID
    
    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
}

module.exports = userShouldBeLoggedIn;
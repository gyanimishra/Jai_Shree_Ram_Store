// Create Token and saving in cookie


const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    // Configure options for cookie
    const options = {
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      httpOnly: true
    };
  
    // Set HTTP response status code, send cookie, and JSON response
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({
        success: true,
        user: user,
        token: token
      });
  };
  
  
  module.exports = sendToken;
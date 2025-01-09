import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) =>{
    try {
        const token = req.cookies.token;
        
        if(!token) return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
        const decode = await jwt.verify(token, process.env.JWT_KEY)

        req.userId = decode.userId;
        next();
        
    } catch (error) {
    console.log('Token verification error:', error.message); 
      return res.status(401).json({
          success: false,
          message: 'Invalid Token',
      });
    }
}

export default isLoggedIn;
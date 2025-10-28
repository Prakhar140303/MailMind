import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: 'No token provided'});
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        req.google_tokens = decoded.google_tokens;
        next();
    }catch(err){
        console.error("Token Authentication Error:", err);
        return res.status(403).json({message: 'Invalid or expired token'});
    }
}
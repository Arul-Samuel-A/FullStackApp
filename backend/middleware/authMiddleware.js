import jwt from 'jsonwebtoken';

function authMiddleware(req,res,next){
    const token = req.cookies.token;
    console.log("reached authMiddleware")
    console.log("Token:", token);

    if(!token){
        return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.admin = decoded;
        next();
    }catch(err){
        console.error("🔥 Error in authMiddleware:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;


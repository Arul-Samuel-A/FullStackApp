import jwt from 'jsonwebtoken';

function generateToken(adminInfo){
    return jwt.sign(adminInfo, process.env.SECRET_KEY, { expiresIn: '30m' });
}

export default generateToken;


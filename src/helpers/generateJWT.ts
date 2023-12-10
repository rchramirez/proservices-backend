import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateJWT = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY || 'mysecretkey', {
        expiresIn: '1h'
    })
}

export default generateJWT;
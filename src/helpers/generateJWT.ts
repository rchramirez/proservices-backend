import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateJWT = (id: String) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'mysecretkey', {
        expiresIn: '1h'
    })
}

export default generateJWT;
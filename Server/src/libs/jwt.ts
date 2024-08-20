import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function signJwt (user: any) {
    const payload = {
        user: {
            id: user.id,
        },
    };
    return jwt.sign(payload, JWT_SECRET || "", {
        expiresIn: '1h',
    });
    }

    export function verifyJwt (token: string) {
        if (!token) return null;
        try {
            return jwt.verify(token, JWT_SECRET || "");
        } catch (err) {
            console.error('Invalid token',err);
            return null;
    }
    }


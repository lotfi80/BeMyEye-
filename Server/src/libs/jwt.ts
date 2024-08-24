import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

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
    export function signRefreshJWT (user: any) {
        const payload = {
            user: {
                id: user.id,
            },
        };
        return jwt.sign(payload, JWT_REFRESH_SECRET || "", {
            expiresIn: '7d',
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
    export function verifyRefreshJwt (token: string) {
        if (!token) return null;
        try {
            return jwt.verify(token, JWT_REFRESH_SECRET || "");
        } catch (err) {
            console.error('Invalid token',err);
            return null;
    }
    }


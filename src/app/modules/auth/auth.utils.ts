import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = async (
    jwtPayload: { user: string; role: string },
    secret: string,
    expiresTime: string,
) => {
    const token = jwt.sign(jwtPayload, secret as string, {
        expiresIn: expiresTime,
    });

    return token;
};


export const verifyToken = async (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
  };
import jwt from 'jsonwebtoken';

export const SECRET_KEY: string = 'require';

export const exportsgenerateAuthToken = (userId: number) => {
    const payload = { userId };
    const options = { expiresIn: '7d' }; // Токен действителен 7 дней
    return jwt.sign(payload, SECRET_KEY, options);
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};

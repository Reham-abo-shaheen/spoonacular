import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookie && req.cookie.token) {
            token = req.cookie.token;
        }

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error("Auth middleware error:", err);
        return res.status(401).json({ msg: "Token invalid or expired" });
    }
}
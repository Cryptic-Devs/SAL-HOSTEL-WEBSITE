const jwt = require('jsonwebtoken');

function protect(req, res, next) {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

function adminOnly(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admins only' });
    }
    next();
}

module.exports = { protect, adminOnly };

const jwt = require('jsonwebtoken');

// Secret key (store in .env in production)
const SECRET = 'supersecretkey';

function authMiddleware(requiredRole) {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }

            req.user = decoded; // { id, role }
            
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ error: 'Access denied' });
            }

            next();
        });
    };
}

module.exports = { authMiddleware, SECRET };

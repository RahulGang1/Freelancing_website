export const isAdmin = (req, res, next) => {
    // Assuming user role is stored in req.user (implement authentication middleware accordingly)
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: "Access denied." });
};

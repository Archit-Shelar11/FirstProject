import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "User not logged in" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(400).json({ message: "User not logged in" });
        }
        req.userId  = decoded.userId;
        next();
    } catch (error) {
        return res.status(400).json({ message: "User not logged in" });
    }
};

export default isAuth;
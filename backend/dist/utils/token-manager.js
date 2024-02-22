import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not received!" });
    }
    console.log(token);
    return jwt.verify(token, process.env.JWT_SECRET, (error, success) => {
        if (error) {
            return res.status(401).json({ message: "Token expired!" });
        }
        else {
            console.log("Token verification successful");
            res.locals.jwtData = success;
            return next();
        }
    });
};
//# sourceMappingURL=token-manager.js.map
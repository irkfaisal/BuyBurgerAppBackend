import ErrorHandler from "../utils/ErrorHandler.js";

// logging authentication
export const isAutheticateed = (req, res, next) => {
    const token = req.cookies['connect.sid'];
    // console.log(token)
    if (!token) {
        return next(new ErrorHandler("Not Logged In", 401));
    }
    next();
}

//  for admin authentication
export const authorizeAdmin = (req, res, next) => {
    if (req?.user?.role !== "admin") {
        return next(new ErrorHandler("Only Admin Allowed", 405));
    }
    next();
};



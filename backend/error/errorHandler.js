const GlobalError = require("./GlobalError");

const sendProductionError = (err, req, res, next, statusCode) => {
    console.log(statusCode);
    if (err.operational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
        });
    }
};

const handleJWTError = () => new GlobalError("Token is not valid!", 403);

const handleJWTExpire = () => new GlobalError("Token expired! Log in again", 403);

module.exports = (err, req, res, next) => {
    statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            err: err,
            status: statusCode,
            stack: err.stack,
        });
    } else if (process.env.NODE_ENV === "production") {
        if (err.name === "JsonWebTokenError") err = handleJWTError(err);
        if (err.name === "TokenExpiredError") err = handleJWTExpire(err);
        sendProductionError(err, req, res, next, statusCode);
    }
};
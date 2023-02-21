const GlobalError = require("./GlobalError");

const sendProductionError = (err, req, res, next, statusCode) => {
    if (err.operational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Something very very wrong!",
        });
    }
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((err) => err.message);
    const finalErr = errors.join(", ");
    return new GlobalError(finalErr, 400);
};

const handleCastError = () => new GlobalError("Provide a valid Object ID!", 403);

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
        if (err.name === "ValidationError") err = handleValidationError(err);
        if (err.name === "CastError") err = handleCastError(err);
        if (err.name === "JsonWebTokenError") err = handleJWTError(err);
        if (err.name === "TokenExpiredError") err = handleJWTExpire(err);
        sendProductionError(err, req, res, next, statusCode);
    }
};
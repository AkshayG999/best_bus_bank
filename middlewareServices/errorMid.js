exports.errorMid = async (status, message, req, res) => {

    console.error(`\n\nTimestamp: [${new Date().toISOString()}]\nStatus: [${status || 500}] \nError: ${message}\nMethod: ${req.method}\nURL: ${req.originalUrl}\nIP: ${req.ip}\nUser-Agent: ${req.get('User-Agent')}`);

    return res.status(status).send({
        success: false,
        message: message
    });
}

exports.handleErrors = (error, req, res) => {
    console.error(error);
    return this.errorMid(
        500,
        error.message || "Internal Server Error",
        req,
        res
    );
};


// Custom error handling middleware
exports.errorHandler = (err, req, res, next) => {
    console.error(`\n\nTimestamp: [${new Date().toISOString()}]\nStatus: [${err.status || 500}] \nError: ${err.message}\nMethod: ${req.method}\nURL: ${req.originalUrl}\nIP: ${req.ip}\nUser-Agent: ${req.get('User-Agent')}`);

    return res.status(err.status || 500).send({
        success: false,
        message: err.message
    });
};
exports.errorMid = async (status, message, req, res) => {

    // Log the error for debugging
    console.error(`[${new Date().toISOString()}] [${status}] ${message}`);

    return res.status(status).json({
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

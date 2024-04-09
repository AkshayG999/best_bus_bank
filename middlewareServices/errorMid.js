exports.errorMid = async (status, message, req, res) => {

    // Log the error for debugging
    console.error(`[${new Date().toISOString()}] [${status}] ${message}`);
    
    if (status === 500) {
        return res.status(status).json({
            success: false,
            error: message
        });
    } else {
        return res.status(status).json({
            success: false,
            message: message
        });
    }

}
exports.handleErrors = (error, req, res) => {
    console.error(error);
    return this.errorMid(
        {
            status: 500,
            error: error.message || "Internal Server Error",
        },
        req,
        res
    );
};

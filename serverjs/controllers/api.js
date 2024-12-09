const sendResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({ success: true, data, message });
};

const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({ success: false, message });
};

module.exports = {
    sendResponse,
    sendError,
};

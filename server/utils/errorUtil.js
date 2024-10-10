const genericMessages = {
    500: 'Internal Server Error'
};

function getFirstErrorMessage(error) {
    return Object.values(error.errors).map(err => err.message)[0];
}

function getErrorMessage(error) {
    const errorName = error.name;

    switch (errorName) {
        case 'ValidationError':
            return getFirstErrorMessage(error);
        case 'Error':
        default:
            return error.message || 'An unknown error occurred';
    }
}

exports.handleErrorResponse = ({ res, statusCode, message = null, error = null }) => {
    let errorMessage;

    if (!message && !error) {
        errorMessage = genericMessages[statusCode];
    } else {
        errorMessage = message ? message : getErrorMessage(error);
    }

    res.status(statusCode).json({ error: errorMessage });
}
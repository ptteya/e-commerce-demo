function getFirstErrorMessage(error) {
    return Object.values(error.errors).map(err => err.message)[0];
}

exports.getErrorMessage = (error) => {
    const errorName = error.name;

    switch (errorName) {
        case 'Error':
            return error.message;
        case 'ValidationError':
            return getFirstErrorMessage(error);
        default:
            return error.message;
    }
}
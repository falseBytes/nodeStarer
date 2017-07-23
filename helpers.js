

// Set user info from request
exports.getUserInfo = (request) => {
    const userInfo = {
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role
    };

    return userInfo;
}
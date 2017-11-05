const register = function register(server, options, next) {
    next();
};

register.attributes = {
    name: 'GitHub',
    version: '1.0.0'
};

module.exports = {
    register
};

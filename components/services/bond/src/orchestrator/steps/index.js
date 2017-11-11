module.exports = {
    acquireBuild: require('./acquire-build'),
    cloneRepository: require('./clone-repository'),
    readBaseImage: require('./read-base-image'),
    removeDirectory: require('./remove-directory'),
    createDirectory: require('./create-directory'),
    createContainer: require('./create-container'),
    runContainer: require('./run-container'),
    stopContainer: require('./stop-container'),
    removeContainer: require('./remove-container'),
    removeFromQueue: require('./remove-from-queue')
};

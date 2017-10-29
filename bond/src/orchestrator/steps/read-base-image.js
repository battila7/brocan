const brocanfile = require('@brocan/brocanfile');

const readBaseImageStep = {
    deps: {
        brocanfile
    },

    async getBaseImage(filename) {
        const contents = await brocanfile.read(filename);

        return contents.base;
    }
};

module.exports = readBaseImageStep;

const Storage = {
    map: new Map(),

    put(buildId, metadata) {
        this.map.set(buildId, metadata);
    },
    get(buildId) {
        return this.map.get(buildId);
    }
};

module.exports = Storage;

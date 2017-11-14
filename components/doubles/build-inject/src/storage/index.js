const Storage = {
    map: new Map(),

    put(id, metadata) {
        this.map.set(id, metadata);
    },
    get(buildId) {
        return this.map.get(id);
    }
};

module.exports = Storage;

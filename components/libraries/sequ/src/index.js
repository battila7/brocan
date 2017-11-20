const Sequ = {
    Sequ() {
        this.queue = [];
        this.inProgress = false;
    },
    get length() {
        return this.queue.length;
    },
    do(provider) {
        return new Promise((resolve, reject) => {
            const providerWrapper = {
                provider,
                resolve,
                reject
            };

            this.queue.push(providerWrapper);

            this.next();
        });
    },
    beginExecution(providerWrapper) {
        providerWrapper.provider()
            .then(result => {
                providerWrapper.resolve(result)

                this.inProgress = false;

                this.next();
            })
            .catch(err => {
                providerWrapper.reject(err);

                this.inProgress = false;
                
                this.next();
            });
    },
    next() {
        if (!this.inProgress && this.queue.length > 0) {
            const providerWrapper = this.queue.shift();

            this.inProgress = true;

            this.beginExecution(providerWrapper);
        }
    }    
};

module.exports = function factory() {
    const s = Object.create(Sequ);

    s.Sequ();

    return s;
};

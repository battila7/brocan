const Sequ = require('@brocan/sequ');

const IN_PROGRESS = 'in_progress';

const BuildService = {
    BuildService(storage) {
        this.updateMap = {
            build: this.updateBuildStatus.bind(this),
            step: this.updateStepStatus.bind(this),
            command: this.updateCommandStatus.bind(this)
        };

        this.storage = storage;

        this.sequMap = new Map();

        setInterval(() => {
            for (const [id, sequ] in this.sequMap) {
                if (sequ.length == 0) {
                    this.sequMap.delete(id);
                }
            }
        }, 60000);
    },

    storeNewBuild(buildRequest) {
        return this.storage.insertBuild(buildRequest);
    },
    getBuildById(id) {
        return this.storage.getBuildById(id);
    },
    addPlan(id, steps) {
        const newSteps = steps.map(step => {
                return {
                    name: step.name,
                    commands: step.commands.map(cmd => ({ command: cmd }))
                }
            });

        return this.storage.updateExecution(id, { steps: newSteps });
    },
    addUpdate(update) {        
        const updater = this.updateMap[update.stage].bind(null, update);

        return this.queueUpdate(update.id, updater);
    },
    queueUpdate(id, updater) {
        if (!this.sequMap.has(id)) {
            this.sequMap.set(id, Sequ());
        }

        const sequ = this.sequMap.get(id);

        return sequ.do(updater);
    },

    async updateBuildStatus(update) {
        const build = await this.storage.getBuildById(update.id);

        build.execution.status = update.status;

        if (update.status == IN_PROGRESS) {
            build.startedAt = Date.now();
        } else {
            build.finishedAt = Date.now();
        }

        return this.storage.updateBuild(build);
    },
    async updateStepStatus(update) {
        const document = await this.storage.getExecutionById(update.id);
        
        const step = document.execution.steps.find(step => step.name == update.name);

        step.status = update.status;

        return this.storage.updateExecution(document.id, document.execution);
    },
    async updateCommandStatus(update) {
        const document = await this.storage.getExecutionById(update.id);
        
        const step = document.execution.steps.find(step => step.name == update.step);

        const command = step.commands[update.index];

        command.status = update.status;

        if (update.reason) {
            document.reason = reason;
        }
        
        return this.storage.updateExecution(document.id, document.execution);
    }
};

module.exports = BuildService;

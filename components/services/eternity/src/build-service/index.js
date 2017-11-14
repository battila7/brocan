const BuildService = {
    BuildService(storage) {
        this.updateMap = {
            build: this.updateBuildStatus.bind(this),
            step: this.updateStepStatus.bind(this),
            command: this.updateCommandStatus.bind(this)
        };

        this.storage = storage;
    },

    storeNewBuild(buildRequest) {
        return this.storage.insertBuild(buildRequest);
    },
    getBuildById(id) {
        return this.storage.getBuildById(id);
    },
    addUpdate(update) {        
        return this.updateMap[update.stage](update);
    },

    async updateBuildStatus(update) {
        const document = await this.storage.getExecutionById(update.id);

        this.setStatusIfUnset(document.execution, update.status);

        return this.storage.updateExecution(document.id, document.execution);
    },
    async updateStepStatus(update) {
        const document = await this.storage.getExecutionById(update.id);
        
        const step = document.execution.steps.find(step => step.name == update.name);

        this.setStatusIfUnset(step, update.status);

        return this.storage.updateExecution(document.id, document.execution);
    },
    async updateCommandStatus(update) {
        const document = await this.storage.getExecutionById(update.id);
        
        const step = document.execution.steps.find(step => step.name == update.step);

        const command = step.commands.find(cmd => cmd.command == update.command );

        this.setStatusIfUnset(command, update.status);
        
        return this.storage.updateExecution(document.id, document.execution);
    },
    setStatusIfUnset(obj, newStatus) {
        if (!obj.status) {
            obj.status = newStatus;
        }
    }
};

module.exports = BuildService;

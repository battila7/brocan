# Processes

The most important processes that occur within brocan are described here. Currently massively WIP.

## Trigger Build

### 1. WebHook POST

Data necessary to trigger the build are received through the webhook endpoint from the repository provider.

### 2. Create build

A new build is created with a unified, vendor-agnostic data model and *pending* status. 

#### 2.1. Create repository

If this is the first build for a specific repository, then a new repository object is created.

#### 2.2. Create branch

If this is the first build for a specific branch in the repository, then a new branch object is created.

### 3. Queue build

Once the build is created, it's placed in the build queue, waiting to be picked up by an agent.

## Execute Build

The prerequisite of a build execution is the presence of a free build agent.

### 1. Agent free signal

An agent signals that it's free and can start a new build.

### 2. Remove build from queue

The first build in the queue is removed and is assigned to the free agent.

### 3. Assemble build image

The image that will be used to perform the build is assembled by the build agent. In order to do this, the git repository is cloned and the brocanfile is processed to check for the base image. Then a new docker image is created.

### 4. Execute build

A new container is created from the freshly assembled image. The build is carried out by the brocan build executor which runs inside the build container.

### 5. Publish build results

After the build process is over, the results are published and saved.

## Log-following

### 1. Full Poll

As the first act of log-following, a full poll is requested. This includes all build details and the logs so far.

### 2. Log Poll

Afterwards a log poll can be executed. This will only result in log lines that were produced after the last poll. Repeat until done.




# Architecture Overview

A high-level overview of the architecture of brocan. Currently work-in-progess.

## Build Architecture

First we'll consider the most vital part of the system: the build architecture. The actual heavy-lifting occurs here by performing builds.

### Gateway

The gateway is the only component that accepts incoming requests. WebHooks can notify brocan of code changes through the gateway. The gateway performs basic validation and rate limiting when necessary and responds to webhook requests as quick as possible to prevent WebHooks from being triggered again. When a new WebHook request is received, the gateway simply emits a new message that a new build request has been issued.

Basically the repository providers (such as GitHub) act as the observers in the traditional CI architecture and submit build requests to the gateway.

### Vendor-specific Metadata Transformers

Brocan should be able to cope with any repository provider that

  * provides git hosting,
  * provides a WebHooks.

However, it's highly unlikely that each and every provider will send WH requests in the same format. Therefore vendor-specific metadata transformers are utilized to turn the received metadata into the standardized inner format.

### Build Queue

When a new build request is received, it's put into the build queue. A build stays in the queue until an agent is available to pick it up. For the build queue, the Reliable Queue pattern of Redis can be used.

### Build Agent - Bond

The build agent is the workhorse of the build process and the place where the magic occurs. The build agent when becomes free, notifies the dispatcher and queries a nem build to perform. After the agent receives the build, it clones the appropriate repository, creates a new image and runs a container based on that image. When the agent is done with a build, the results are published and a notification is sent, that the build is over.

### Build Runner - Bolt

Bond and Bolt are the best friends. Bond tells Bolt what to do and Bolt happily runs it. Bolt is the build runner deployed inside every image (and container). When a new container is spun up, 
Bolt parses the brocanfile and takes the necessary steps. Of course during this process, Bolt issues the commands in the brocanfile and orchestrates the process.

### Conductor

Without the Conductor, the build system would not be able to run even a single build. The Conductor is the component which assigns builds to agents and acknowledges the build results. Basically, the Conductor is responsible for the build queue.

### Storage

#### Data

Build data such as the status, repository metadata, commit metada, etc. is stored in a single database.

#### Logs

Build logs are stored in a separate database which makes it easy (and fast) to query them.




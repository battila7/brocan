# What happens when...

This article is intended to describe what happens when you push some new code to a repository that has Brocan integration set up. Get ready, it's gonna be quite a journey!

## Build Request

Let's assume that you have set up the appropriate WebHook in GitHub and have pushed some commits to the repository. Upon receiving some changes, GitHub sends a `push` to applicable WebHook URIs. Of course, these include the URI used by Brocan.

The request is handled by [Bouncer](../../components/services/bouncer) that acts as a gateway to the Brocan Build System. Bouncer extracts the headers and payload from the request and sends a new message to the `build.transform` topic. WebHook transformer service can subscribe to this topic and match on the appropriate header or payload fields. In our case, GitHub supplies the `X-GitHub-Event` and `X-GitHub-Delivery` header fields, so [GitHub Transformer](../../components/services/transformer/github) is going to look for these in the message. 

If the pattern matching succeeds, GitHub Transformer will create a new Brocan Build Request Format object and send it back to Bouncer. At this moment, the BBRF object does not include the `id` field. Populating that field is the task of [Identity](../../components/services/identity) upon receiving the BBRF through the `build.generateIdentifier` topic.

Once Bouncer has the BBRF with the `id` field set, it can announce the build on the `build.info` topic with the `new` role. The message sent to this topic contains the BBRF as well as the original WebHook request. Currently, there are three services listening for messages on this topic: 

  * [Eternity](../../components/services/eternity) saves the BBRF, 
  * [Origins](../../components/services/origins) stores the WebHook request matched to the build identifier,
  * [Input](../../components/services/input) pushes the build identifier to the build queue (maintained by Faktory).

The first phase of your build is over, and it will sit in the build queue until a build agent is able pick it up.

## Build Execution

Once a [Bond](../../components/services/bond) build agent is available, it will ask Faktory for the next build identifier in the queue. Let's assume that it's the build created from our previous request.

From an implementation point of view, Bond is just a shell executing one step after another. These steps can be divided into two pipelines, the build and the clean-up pipeline.

The build pipeline consists of the following steps:

  1. **Get Next Build** - Faktory is queried for the next build to execute.
  1. **Create Directory** - A new directory is created for the repository.
  1. **Clone Repository** - The repository is cloned into the previously created directory.
  1. **Read Brocanfile** - The brocanfile is read and parsed. This step is necessary to determine the environment the build should be run in and in order to notify other services of the build steps.
  1. **Publish Plan** - Steps and commands in the brocanfile are published so that other services can process them.
  1. **Translate Base Image** - Using [Bay](../../components/services/bay), the value of the brocanfile's `base` field is translated into an actual docker image name. This is done through the `build.getBaseImageTranslation` topic.
  1. **Pull Base Image** - The translated base image is pulled using docker from the Brocan Docker Registry.
  1. **Create Container** - A new container is created for the build with the appropriate environment variables set, executing [Bolt](../../components/services/bolt).
  1. **Run Container** - The newly created container is spinned up. For most of the builds, this is going to be the longest step. As part of this process, Bolt takes the brocanfile and executes it step-by-step, command-by-command. The results of the command executions are reported to the appropriate Bond instance which will in turn, publish them on the `build.info` topic under the `progress` role. Most importantly, Eternity will take care of persisting execution data. The build output (logs) are sent to ElasticSearch labeled with the identifier of the build.

Naturally, here we have gone through the happy path. In real life scenarios, an awful lot of things can go wrong. To guard ourselves a bit, the build pipeline is shielded by a timeout that kills stuck builds. 

No matter how the build pipeline is over, it's time to execute the clean-up pipeline:

  1. **Publish Failure** - An optional step that announces failure for interested services.
  1. **Remove From Queue** - Faktory will put back an element to the queue unless it gets acknowledged. This is the step responsible for that action.
  1. **Remove Directory** - The directory containing the code repository is wiped out.
  1. **Stop Container** - If still running, the build container is halted.
  1. **Remove Container** - The build container is deleted.
  1. **Release Build** - Some additional clean-up, completely releasing the build.

Yay, we're done! The journey our push has gone through is over. Build data can be queried using the [Build](../../components/services/build) service, while logs can be accessed by dropping [Hound](../../components/services/hound) some messages. Of course, these cannot be done directly, but through the [Entrance](../../components/services/entrance) gateway.

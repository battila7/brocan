# What happens when...

This article is intended to describe what happens when you push some new code to a repository that has Brocan integration set up.

## Build Request

Let's assume that you have set up the appropriate WebHook in GitHub and have pushed some commits to the repository. Upon receiving some changes, GitHub sends a `push` to applicable WebHook URIs. Of course, these include the URI used by Brocan.

The request is handled by [Bouncer](../../components/services/bouncer) that acts as a gateway to the Brocan Build System. Bouncer extracts the headers and payload from the request and sends a new message to the `build.transform` topic. WebHook transformer service can subscribe to this topic and match on the appropriate header or payload fields. In our case, GitHub supplies the `X-GitHub-Event` and `X-GitHub-Delivery` header fields, so [GitHub Transformer](../../components/services/transformer/github) is going to look for these in the message. 

If the pattern matching succeeds, GitHub Transform will create a new Brocan Build Request Format object and send it back to Bouncer. At this moment, the BBRF object does not include the `id` field. Populating that field is the task of [Identity](../../components/services/identity) upon receiving the BBRF through the `build.generateIdentifier` topic.

Once Bouncer has the BBRF with the `id` field set, it can announce the build on the `build.info` topic with the `new` role. The message sent to this topic contains the BBRF as well as the original WebHook request. Currently, there are three services listening for messages on this topic. [Eternity](../../components/services/eternity) which will save the BBRF, [Origins](../../components/services/origins) which will save the WebHook request matched to the build identifier and maybe the key one, [Input](../../components/services/input), pushing the build identifier to the build queue (maintained by Faktory).

The first phase of your build is over, and it will sit in the build queue until a build agent can pick it up.

## Build Execution

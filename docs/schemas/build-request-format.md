# Brocan Build Request Format

The Brocan Build Request Format is the common format used in Brocan to request a new build. This includes all pieces of information needed to perform a build. The need for a common internal format arises from the fact that different repository providers utilize different WebHook payloads. In order to enable the build system to create and perform builds based on requests from various providers, the Brocan Build Request Format is used. This is completely repository-agnostic internal WebHook payload format.

Most widely used repository providers and their WebHook payload schemas:

  * [GitHub](https://developer.github.com/v3/activity/events/types/#pushevent)
  * [GitLab](https://docs.gitlab.com/ce/user/project/integrations/webhooks.html#push-events)
  * [BitBucket](https://confluence.atlassian.com/bitbucket/event-payloads-740262817.html#EventPayloads-Push)

BBRF should be the intersection of the aforementioned format so the transformation process can be carried out effortlessly and without additional requests.

As a clarification: BBRF contains a subset of data related to builds. It only contains data originating from repository providers. BBRF does not include for example step or command execution status.

## Fields

### Quick Reference

| Field             | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `buildId`         | A unique identifier of the build. Must be URI friendly.             |
| `commitCount`     | The number of commits pushed.                                       |
| `timestamp`       | The time and date the build was requested at.                       |
| `requestHash`     | Hash of the original request.                                       |
| `author.name`     | The display name of the author.                                     |
| `author.username` | The username of the author.                                         |
| `author.uri`      | Link to the author in the repository provider.                      |
| `branch.name`     | The name of the updated branch.                                     |
| `branch.uri`      | Link to the updated branch in the repository provider.              |
| `commit.hash`     | The hash of the most recent commit after the push.                  |
| `commit.message`  | The message of the most recent commit after the push                |
| `commit.uri`      | Link to the most recently pushed commit in the repository provider. |
| `repository.name` | The name of the updated repository.                                 |
| `repository.uri`  | Link to the updated repository in the repository provider.          |

### Detailed Notes

Here you can find additional information on specific fields.

  * `buildId`
    * This identifier is used throughout the entire Brocan system to identify builds. Therefore it must be unique. However, it should not be completely artificial but assembled from the original request data. That way it makes sense for humans too and can be included in nice URIs.
  * `requestHash`
    * A hash created from the contents of the original request. It's a good idea to persist the original request for debugging purposes. However as it can be huge, it makes no sense to include it in the BBRF. Therefore only a hash is included which can be used to query for the original request when necessary.
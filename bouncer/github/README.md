# Bouncer GitHub Plugin

Plugin for Bouncer that can accepts requests coming from GitHub WebHooks. Only `push` events are accepted.

## Hapi Plugin Dependencies

  * [hapi-pino](https://github.com/pinojs/hapi-pino/tree/v2.x.x)
  * [bouncer-messaging](../server/src/messaging/index.js)

## Communication

### Inbound

#### HTTP

##### `POST` `/`

  * **Request**
    * Required Headers
        * `X-GitHub-Delivery`
        * `X-GitHub-Event`
    * Required Payload Fields - see [PushEvent](https://developer.github.com/v3/activity/events/types/#pushevent) for a detailed reference
        * `ref` - string
        * `commits` - array
        * `head_commit` - objec
        * `repository` - object
        * `sender` - object
  * **Response**
    * `200 OK` - If the request was valid. Empty body.
    * `400 Bad Request` - If a validation error occurs.
  * **Description**
    * Processes a GitHub WebHook build requests and sends it to the Brocan Build System.

### Outbound

#### NATS

##### Build transform request

  * **Topic**: `build`
  * **Role**: `transform`
  * **Type**: `req/repl`
  * **Payload**:
    * `origin` - Always `github`.
    * `payload` - The payload received as part of the original GitHub request.
  * **Description**
    * A build transformation and initiation request.

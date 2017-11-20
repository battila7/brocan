# Origins

WebHook payload storage service. Origins stores the original request that resulted in a new build. 

## Background

The original request behind a build is rather rarely used but can be of great importance when it comes to debugging. Also, because these payloads are a bit larger most of the times, transmitting them frequently would be wasteful. Therefore they are stored in the separate storage and are only retrieved for specific requests.

## Environment Dependencies

  * NATS
  * Redis

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Add WebHook Payload

  * **Channel** - NATS
  * **Type** - pub/sub (in)
  * **Payload**
    * `topic` - `build.info`
    * `role` - `new`
    * `buildRequest` - The BBRF format request created from the WebHook payload.
    * `webhookRequest` - The original WebHook payload.
  * **Response** - none
  * **Description**
    * Stores the `webhookRequest` matched with the resulting BBRF build request.

### Get WebHook Payload

  * **Channel** - NATS
  * **Type** - req/reply (in)
  * **Payload**
    * `topic` - `build.retrieveOrigin`
    * `id` - The id of the build.
  * **Response**
    * The original request payload.
  * **Description**
    * Retrives the request behind the build with the specified id.

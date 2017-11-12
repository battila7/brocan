# GitHub Transformer

GitHub WebHook to Brocan Build Request Format transformer service.

## Environment Dependencies

  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Inbound

#### NATS - Add

##### Build transform request

  * **Topic**: `build.transform`
  * **Type**: `req/repl`
  * **Payload**:
    * `origin` - `github`.
    * `webhookRequest` - The payload received as part of the original GitHub request.
  * **Description**
    * A build transformation and initiation request.

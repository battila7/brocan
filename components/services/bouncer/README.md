# Bouncer Server

The gateway to the Brocan Build System which is responsible for initiating builds by announcing them on the `build.new` topic. Transforming the webhook requests is done by transformer services selected by pattern matching.

## Environment Dependencies

  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

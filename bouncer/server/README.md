# Bouncer Server

The gateway to the Brocan Build System. This component does not declare any routes but is a shell in which plugins can be registered that can handle various repository providers.

Keep in mind that transforming the webhook payloads into the common Brocan format should not occur in the gateway. Bouncer and its plugins should only care about request validation.

## Project Dependencies

  * [Bouncer GitHub Plugin](../github) - All routes prefixed by `/github`.

## Environment Dependencies

  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

For inbound and outbound communication, please refer to the individual plugins.

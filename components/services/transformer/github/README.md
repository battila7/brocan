# GitHub Transformer

GitHub WebHook to Brocan Build Request Format transformer service.

## Background

Data coming from WebHooks cannot be fed directly into the Brocan Build System, but m ust be translated into the common Brocan Build Request Format (BBRF). This is done by transformer services.

The GitHub Transformer is capable of translating WebHook payloads coming from GitHub.

## Environment Dependencies

  * NATS

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Add WebHook Payload

  * **Channel** - NATS
  * **Type** - req/rep (in)
  * **Payload**
    * `topic` - `build.transform`
    * `webhookRequest` - The original WebHook payload.
    * The `webhookRequest.headers.x-github-delivery` and `webhookRequest.headers.x-github-event` fields must be present in the payload.
  * **Response** - A BBRF object.
  * **Description**
    * Transforms `webhookRequest` into a BBRF object. 

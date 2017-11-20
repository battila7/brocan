# Bay

Base image translator service of the Brocan CI.

## Background

Brocanfiles must include a field named `base` which describes the base environment in which the build should be run. In order to prevent abstraction leakage, feasible values are not real Docker image names, but more approachable ones, such as `node` or `maven`. THerefore these simpler names must be translated into real image names that can be pulled and started. This translation is done by `Bay`.

## Environment Dependencies

  * NATS
  * Redis

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Add Translation

  * **Channel** - NATS
  * **Type** - sink (in)
  * **Payload**
    * `topic` - `build.addBaseImageTranslation`
    * `from` - The value which should be translated (ie. is a valid value for the brocanfile `base` field).
    * `to` - The name of the image that can be pulled and run.
  * **Response** - none
  * **Description**
    * Inserts a new mapping into the underlying database. This mapping is a new translation from the payload's `from` field to the `to` field.

### Get Translation

  * **Channel** - NATS
  * **Type** - req/reply (out)
  * **Payload**
    * `topic` - `build.getBaseImageTranslation`
    * `base` - The value to be translated.
  * **Response**
    * `image` - The result of the translation.
  * **Description**
    * Gets the base image that corresponds to the `base` field.

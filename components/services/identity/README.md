# Identity

Build identifier generator.

## Environment Dependencies

  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Inbound

#### NATS - Add

##### Identifier generation request

  * **Topic** - `build.generateIdentifier`
  * **Type** - `req/repl`
  * **Payload**
    * `buildRequest` - A BBRF object without `buildId` field.
  * **Response**
    * `buildId` - The newly generated build identifier.
  * **Description**
    * Generates a new build identifier using the data in included in the BBRF object.

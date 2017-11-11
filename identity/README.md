# Identity

Build identifier generator.

## Environment Dependencies

  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Inbound

#### NATS

##### Identifier generation request

  * **Topic** - `build`
  * **Role** - `identifier`
  * **Payload**
    * `buildRequest` - An BBRF object without `buildId` field.
  * **Response**
    * A single string, the generated `buildId`.
  * **Description**
    * Generates a new build identifier using the data in included in the BBRF object.

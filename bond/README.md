# Bond

Bond is the build agent of Brocan CI.

## Project Dependencies

  * brocanfile

## Environment Dependencies

  * Faktory
  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Inbound

#### TCP

##### Faktory

  * **Description**: Uses Faktory for fetching new build jobs.

#### HTTP 

##### `/:buildId/report/:stage`

   * **URI Params**:
     * `buildId` - The ID of the currently executing build. An arbitrary string.
     * `:stage` - The build stage the report belongs belongs to. Can be any of these three values: `command`, `step`, `build`.

   * **Payload**: Please refer to the outbound communication of Bolt.
   * **Response**: Immediate with empty payload and `200 OK` status code.
   * **Description**: This is the endpoint Bolt is intended to use when reporting the build status.

### Outbound

#### NATS

##### Build progress update

  * **Topic**: `build`
  * **Role**: `progress`
  * **Type**: `pubsub`
  * **Payload**: The same fields as those received on the `/:buildId/report/:stage/` endpoint, augmented with the `buildId` and `stage`.
  * **Description**: An asynchronous build progress update.

##### Build metadata fetch

  * **Topic**: `build`
  * **Role**: `query`
  * **Type**: `req/repl`
  * **Payload**:
    * `buildId`: The ID of the requested build metadata.
  * **Description**: Query metadata for specific build. The metadata must include the information needed for the build execution. This includes the repository URI and branch name.

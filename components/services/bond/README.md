# Bond

Bond is the build agent of Brocan CI.

## Project Dependencies

  * brocanfile

## Environment Dependencies

  * Faktory
  * NATS (Hemera)
  * Git must be installed in the container/machine running Bond

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Inbound

#### TCP

##### Faktory

  * **Description**: Uses Faktory for fetching new build jobs.

#### HTTP 

##### **POST** `/:buildId/report/:stage`

  * **Request**
    * URI Params
      * `buildId` - The ID of the currently executing build. An arbitrary string.
      * `stage` - The build stage the report belongs belongs to. Can be any of these three values: `command`, `step`, `build`.
    * Payload
      * Please refer to the outbound communication of Bolt.
  * **Response**
    * Immediate with empty payload and `200 OK` status code.
  * **Description**
    * This is the endpoint Bolt is intended to use when reporting the build status.

### Outbound

#### NATS - Act

##### Build progress update

  * **Topic** - `build.info`
  * **Type** - `pub/sub`
  * **Payload**
    * `role` - `progress`
    * `buildId` - The identifier of the build.
    * `stage` - The stage the update, which can be `build`, `step` or `command`.
    * And all the same fields as those received on the `/:buildId/report/:stage/` endpoint.
  * **Description**
    * An asynchronous build progress update.

##### Build data fetch

  * **Topic** - `build.queryBuildData`
  * **Type** - `req/repl`
  * **Payload**
    * `buildId` - The ID of the requested build metadata.
  * **Description**
    * Query data for specific build. The data must include the information needed for the build execution. This includes the repository URI and the commit hash.

# BuildInject

Can be used to test Bond and Bolt. Reads JSON input from the console and pushes it into the Faktory queue and replies with appropriate build metadata.

Using BuildInject, only a Bond instance, a Faktory queue and NATS are needed for testing.

## Running BuildInject

BuildInject can be started using the `npm start` command. Once it's started up, single-line JSON objects can be entered. For example:

~~~~JSON
{ "buildId": "id", "repoUri": "https://github.com/battila7/brocan-example", "branch": "master" }
~~~~

BI will push `id` into the Faktory queue and will respond to metada queries having `buildId` equal to `id` with the metadata specified in the JSON.

## Environment Dependencies

  * Faktory
  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Communication

### Inbound

#### NATS

##### Build metadata query

  * **Topic**: `build`
  * **Role**: `query`
  * **Type**: `req/repl`
  * **Payload**: A single `buildId` field is expected.
  * **Description**: Returns metadata (git repository URI, branch name) about the build with the specified `buildId`.

### Outbound

#### Faktory

Pushes `buildId`s with `build` jobtype to the `default` queue.

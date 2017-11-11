# Whisperer

Whisperer can be used to send arbitrary NATS-Hemera messages. It simply consumes the contents of the standard input, converts it to JSON and sends it through hemera. Pretty useful tool for testing purposes.

## Running Whisperer

~~~~bash
npm start < input.json
~~~~

## Environment Dependencies

  * NATS (Hemera)

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

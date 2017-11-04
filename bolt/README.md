# Bolt

Bolt is the build runner tool of Brocan CI.

## Features

Bolt is able to

  * parse and execute well-formed brocanfiles,
  * report the status of the execution process.

## Running Bolt

~~~~bash
npm i -g @brocan/bolt

bolt
~~~~

## Project Dependencies

  * brocanfile
  * sequ

## Expected configuration and environment variables

Please see the schema in [src/config.js](src/config.js) for documentation and default values.

## Build execution

When started, Bolt first parses and validates the contents of the brocanfile. It this process succeeds, then Bolt continues with the actual build execution.

Basically, Bolt takes every step and every command and executes them sequentially. During the course of this process, Bolt logs (a lot) to the standard output and sends reports to an agent. The details of this reporting protocol is described in the documentation of the Bond build agent.

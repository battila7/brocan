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

  * env
  * sequ

## Expected environment variables

Instead of relying on command line parameters, Bolt expects some environment variables to be present when being run:

  * `BOLT_RUNNER_BROCANFILE_PATH` - Relative path to the brocanfile to be executed.
  * `BOLT_RUNNER_BUILD_ID` - An arbitrary identifier of the current build.
  * `BOLT_RUNNER_REPORTER_HOST` - The host Bolt will report to.

These can also be set in configuration files in a `node-config` compatible way.

## Build execution

When started, Bolt first parses and validates the contents of the brocanfile. It this process succeeds, then Bolt continues with the actual build execution.

Basically, Bolt takes every step and every command and executes them sequentially. During the course of this process, Bolt logs (a lot) to the standard output and sends reports to an agent. The details of this reporting protocol is described in the documentation of the Bond build agent.

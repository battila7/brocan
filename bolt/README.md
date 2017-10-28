# Bolt

Bolt is the build runner tool of Brocan CI.

## Features

Bolt is able to

  * parse and execute well-formed brocanfiles,
  * report the status of the execution process.

## Project Dependencies

  * env

## Running Bolt

### Expected environment variables

Instead of relying on command line parameters, Bolt expects some environment variables to be present when being run:

  * `BOLT_RUNNER_BROCANFILE_PATH` - Relative path to the brocanfile to be executed.
  * `BOLT_RUNNER_BUILD_ID` - An arbitrary identifier of the current build.
  * `BOLT_RUNNER_REPORTER_HOST` - The host Bolt will report to.
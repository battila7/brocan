# Brocan CI

Brocan (pun intended) is a simple continuous integration system that serves as a fun exercise and a school project.

## Features/Goals

The intended features of Brocan are the following:

  * Producing brocan builds
    * Builds are triggered upon changes using webhooks
    * Supported repository providers: GitHub, GitLab, BitBucket
  * Log-following of running builds.
  * Custom environment variable passing.
    * Allows repository owners to pass environment variables to the build context.


## Components

### Apps/Services

  * [Bolt](bolt) - Command line build runner tool.
  * [Bond](bond) - Agent. Build agent.

### Libraries

  * [env](env) - Environment configuration libary for Node based on [node-config](https://github.com/lorenwest/node-config).
  * [sequ](sequ) - Node promise queue which ensures the sequential execution of promises.

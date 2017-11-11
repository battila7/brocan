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

## Project Structure

  * [deployment](deployment) - Deployment scripts for various configurations and environments.
  * [docs](docs) - Documentation for processes, architecture and alike.
  * [doubles](doubles) - Test doubles used to mock/fake/stub parts of the system.
  * [lessons-learned](lessons-learned) - Blog-like posts concluding the experience gained.

Other folders either contain a library or a service.

## Components

### Apps/Services

  * [Bolt](bolt) - Command line build runner tool.
  * [Bond](bond) - Agent. Build agent.
  * [Bouncer](bouncer) - WebHook Gateway.
    * [Server](bouncer/server) - The customisable gateway component of Bouncer.
    * [GitHub](bouncer/github) - GitHub WebHook plugin for Bouncer.
  * [Identity](identity) - Build identifier generator.

### Libraries

  * [brocanfile](brocanfile) - Node brocanfile parser and validator.
  * [env](env) - **[DEPRECATED - Use convict instead]** Environment configuration libary for Node based on [node-config](https://github.com/lorenwest/node-config).
  * [sequ](sequ) - Node promise queue which ensures the sequential execution of promises.

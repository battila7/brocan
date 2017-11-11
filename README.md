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

  * [components](components) - The components that make up Brocan.
  * [deployment](deployment) - Deployment scripts for various configurations and environments.
  * [docs](docs) - Documentation for processes, architecture and alike.

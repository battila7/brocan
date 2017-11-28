# Brocan CI

Brocan (pun intended) is a feature-wise simple but architecturally a bit more complex continuous integration system that's been developed as a university project. 

Eye-candy web UI, deployments and stuff like that should not be expected from Brocan. The focus was mainly on the introduction of microservices rather than a wide feature set.

## Features

Brocan is capable of

  * Producing brocan builds
    * Builds are triggered upon changes through webhooks
    * Supported repository providers: GitHub (others can be added easily)
  * Serving data regarding the finished and currently executing builds.

## How to run Brocan?

Please refer to the scripts and instructions in the [deployment](deployment) folder for building and running Brocan.

## Project Structure

  * [components](components) - The components that make up Brocan.
  * [deployment](deployment) - Deployment scripts for various configurations and environments.
  * [docs](docs) - Documentation for processes, architecture and alike.

## The way it works

Please head to the [What happens when...](docs/implementation/what-happens-when.md) article to get a better understanding, how Brocan works.

## The stack
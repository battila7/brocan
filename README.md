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

A friendly enumeration of the techs/components/libraries used by Brocan

  * [docker](https://www.docker.com/) - All services are containerized and builds run in a container as well.
  * [ElasticSearch + Kibana](https://www.elastic.co/) - Logs (by internal services and by build containers) are stored in ElasticSearch and are searchable using Kibana.
  * [Faktory](http://contribsys.com/faktory/) - Queue for the builds.
  * [Hemera](https://github.com/hemerajs/hemera) - JS Microservice Framework built upon NATS. Although I wanted Brocan to be language- and framework-agnostic, I settled with Hemera to speed up the development.
  * [MongoDB](https://www.mongodb.com/) - Storage for build and execution data.
  * [NATS](https://nats.io) - Messaging system with tremendous performance and nice language support.
  * [Redis](https://redis.io/) - Only used as a simple K/V storage for various purposes.
  * [Scope](https://github.com/weaveworks/scope) - Used for monitoring Brocan.

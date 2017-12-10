# Deployment > Development

Deployment scripts to spin up various parts of the system. The script name indicates the comprising components.

## Running Brocan

### Prerequisites

  * `docker` up and running
  * *nix OS (Windows is not supported)
  * `dockerd` is using `/var/run/docker.sock`
  * `/tmp/brocan` folder can be created

### Setup

First build the images using

~~~~bash
docker-compose -f build-system.yml build
~~~~

Then create a new bridged docker network named `brocan-development-network`. 

### Start

The whole Brocan Build System can be started using the following command:

~~~~bash
docker-compose -f build-system.yml up
~~~~

Once Brocan is running, logs can be accessed in Kibana at `localhost:5601`.

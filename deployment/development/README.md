# Deployment > Development

Deployment scripts to spin up various parts of the system. The script name indicates the comprising components. The following configurations are available:

 * [bond-faktory-nats.yml](bond-faktory-nats.yml) - Starts a single Bond instance along with a Faktory queue and NATS. Can be used to test Bond using BuildInject.
 * [bouncer-nats.yml](bouncer-nats.yml) - Only the Bouncer Gateway and NATS are started. Useful for WebHook testing.
 * [identity-nats.yml](bouncer-nats.yml) - Only Identity and NATS are started. Can be used to test build identifier generation.
 * [origins-redis-nats.yml](origins-redis-nats.yml) - Spins up a Redis server and NATS to ease the testing of Origins.
 
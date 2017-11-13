# Components

## Apps/Services

Applications and services that are strictly the part of the Brocan.

  * [Bolt](services/bolt) - Command line build runner tool.
  * [Bond](services/bond) - Agent. Build agent.
  * [Bouncer](services/bouncer) - WebHook Gateway.
    * [Server](services/bouncer/server) - The customisable gateway component of Bouncer.
    * [GitHub](services/bouncer/github) - GitHub WebHook plugin for Bouncer.
  * [Eternity](services/eternity) - Build storage.
  * [Identity](services/identity) - Build identifier generator.
  * [Input][services/input] - Build queue pusher.
  * [Origins](services/origins) - WebHook payload storage service.
  * [Transformer](services/transformer) - WebHook to BBRF transformers.
    * [GitHub](services/transformer/github) - GitHub WebHook to BBRF transformer.

## Doubles

Test doubles used to mock/fake/stub parts of the system.

  * [BuildInject](doubles/build-inject) - Double to test Bond.

## Libraries

Common libraries used among other components.

  * [brocanfile](libraries/brocanfile) - Node brocanfile parser and validator.
  * [env](libraries/env) - **[DEPRECATED - Use convict instead]** Environment configuration libary for Node based on [node-config](https://github.com/lorenwest/node-config).
  * [sequ](libraries/sequ) - Node promise queue which ensures the sequential execution of promises.

## Utilities

Miscellaneous tools that ease testing, deployment, development etc.

  * [Whisperer](utilities/whisperer) - Send arbitrary NATS-Hemera messages.

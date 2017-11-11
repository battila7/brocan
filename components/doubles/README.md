# Doubles

Fakes, mocks and stubs that can be used to ease the testing of smaller parts or individual components of the system.

For every double, two lists are provided:

  * **Tests**: Services/components that can be exercised through the double.
  * **Needs**: Services/components needed by the double to work correctly.

## [BuildInject](build-inject)

  * **Tests**
    * Bond
    * Bolt
  * **Needs**
    * Bond
    * Faktory
    * NATS

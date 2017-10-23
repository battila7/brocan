# Brocanfile

This document serves as a reference for the structure of the brocanfiles. A brocanfile is a file named `brocan.yml` in the root of a repository.

## Allowed fields

### `base`

Defines the base environment in which the build is going to be executed.

~~~~YAML
base: java8
~~~~

### `users`

An optional array of users who are allowed to modify the build using the brocan API or online interface. This includes, for example the right to add, remove or modify environment variables.

~~~~YAML
users:
    - battila7
~~~~

### `steps`

An array of step definitions that will comprise the build. Each step definition must include a unique `name` and zero or more commands. If there is no `flow` specified in the brocanfile, then the steps in this array will be executed serially.

~~~~YAML
steps:
    - name: compile
      commands:
        - mvn compile
    - name: test
      commands:
        - mvn test
~~~~

### `flow`

Optionally describes the flow of the build. Can be used for step reuse and even looping. Branching is based on the return value of the steps.

The `flow` array includes elements with two fields:

  * `step` - the name of the step to be executed
  * `when` - a decision table which maps step names to return values. If omitted, then in the case of a `0` return value, the next flow-element is executed, while in other cases, the build is terminated.

~~~~YAML
flow:
    - step: build
      when:
        0: test
    - step: test
~~~~

## Full example

The following example is assembled from the previous smaller snippets:

~~~~YAML
base: java8
users:
  - battila7
steps:
  - name: build
    execute:
      - mvn compile
  - name: test
    execute:
      - mvn test
flow:
  - step: build
    when:
      0: test
  - step: test
~~~~

Note, that the previous brocanfile is equivalent to the following:

~~~~YAML
base: java8
users:
  - battila7
steps:
  - name: build
    execute:
      - mvn compile
  - name: test
    execute:
      - mvn test
~~~~
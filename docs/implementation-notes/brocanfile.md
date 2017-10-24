# Brocanfile

This document serves as a reference for the structure of the brocanfiles. A brocanfile is a file named `brocan.yml` in the root of a repository.

## Allowed fields

### `base`

Defines the base environment in which the build is going to be executed.

~~~~YAML
base: java8
~~~~

### `owner`

The username of the person who is the owner of the repository. Only needed for the first build of a specific repository when entries are created. Initially, only the owner has the right to change several properties of the build (such as the environment variables), but they have the permission to grant rights to other users too.

~~~~YAML
owner: battila7
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
owner: battila7
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
owner: battila7
steps:
  - name: build
    execute:
      - mvn compile
  - name: test
    execute:
      - mvn test
~~~~
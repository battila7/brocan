# Brocanfile Reference

This document serves as a reference for the structure of the brocanfiles. The format used for brocanfiles is [HJSON](www.hjson.org). The brocanfile should always be placed in the root of a repository with filename set to `brocan.hjson`.

## Allowed fields

### `base`

Defines the base environment in which the build is going to be executed.

~~~~HJSON
base: java8
~~~~

### `owner`

The username of the person who is the owner of the repository. Only needed for the first build of a specific repository when entries are created. Initially, only the owner has the right to change several properties of the build (such as the environment variables), but they have the permission to grant rights to other users too.

~~~~HJSON
owner: battila7
~~~~

### `steps`

An array of step definitions that will comprise the build. Each step definition must include a unique `name` and one or more commands. These are the steps which will be executed serially by the build runner. At least one step is required.

~~~~HJSON
steps: [
    {
        name: compile
        commands: [
            mvn compile
        ]
    },
    {
        name: test
        commands: [
            mvn test
        ]
    }
]
~~~~

## Full example

The following example is assembled from the previous smaller snippets:

~~~~HJSON
base: java8
owner: battila7
steps: [
    {
        name: compile
        commands: [
            mvn compile
        ]
    },
    {
        name: test
        commands: [
            mvn test
        ]
    }
]
~~~~

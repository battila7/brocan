# Build Identifier Reference

This document describes the structure of the build identifier. 

The build identifier is generated from the data available in the [Brocan Build Request Format](build-request-format.md). There any many possible formats that could be generated from this data, that's why this document was created.

## Structure

The identifier is basically a hash created from the following fields of the BBRF:

  * `timestamp`
  * `repository.uri`
  * `commit.hash`

These three fields uniquely identify build requests, therefore a hash of them is a good candidate for the build identifier.

# env

A simple wrapper around `node-config` which provides a way to ensure the presence of required properties.

## Usage

~~~~JavaScript
// will throw if PORT is not set
const env = require('@brocan/env').ensure([
    'PORT'
]);

const [ port, host ] = env.getAll([ 'PORT', 'HOST' ]);

// will return localhost if HOST is unset
const host = env.getOrDefault('HOST', 'localhost');
~~~~

## API

### `ensure(properties: Array<string>): env`

Checks if the specified properties are set. Throws if any of the required properties is missing. The thrown `Error` object has a `missing` field with the array of the missing properties.

Returns the env instance if all properties are set.

### `get(property: string): string`

Provides the same functionality as `config.get()`.

### `getAll(...properties: string): Array<string>`

Returns property values for multiple properties.

### `getOrDefault(property: string, value: any): any`

If the specified property is set, then returns its value, otherwise returns the value passed as the second parameter.

### `getOrProvide(property: string, provider: (string) => any): any`

If the specified property is set, then returns its value, otherwise calls the provider function with the property and returns the result.

### `has(property: string): boolean`

Provides the same functionality as `config.has()`.
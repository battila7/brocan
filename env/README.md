# env

A simple wrapper around `node-config` which provides a way to ensure the presence of required properties.

## API

### ensure(properties: Array<string>)

Checks if the specified properties are set. Throws if any of the required properties is missing. The thrown `Error` object has a `missing` field with the array of the missing properties.

Returns the env instance if all properties are set.

### get(property: string)

Provides the same functionality as `config.get()`.

### getOrDefault(property: string, value: any)

If the specified property is set, then returns its value, otherwise returns the value passed as the second parameter.

### getOrProvide(property: string, provider: (string) => any)

If the specified property is set, then returns its value, otherwise calls the provider function with the property and returns the result.

### has(property: string)

Provides the same functionality as `config.has()`.
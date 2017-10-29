# brocanfile

Brocanfile parser and validator for Node.

Please see [REF.md](REF.md) for the brocanfile reference.

## Usage

~~~~JavaScript
const brocanfile = require('brocanfile');

brocanfile.read('brocan.hjson')
    .then(contents => console.log(contents));
~~~~

## API

### `read(filename: string): Promise<any>`

Reads the specified file and then parses and validates its contents. Throws an Error if 

  * the file cannot be opened or read,
  * the contents of the file are not valid HJSON,
  * the contents of the file violate the brocanfile specification.

In the latter case, the thrown Error instance has a `validationErrors` field containing the array of constraint violations.

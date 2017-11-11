# sequ

sequ is a basic queue which will execute promise-providing functions sequentially, only one-at-a-time.

## Usage

~~~~JavaScript
const Sequ = require('@brocan/sequ');

// create a new sequ
const sequ = Sequ();

sequ.do(() => {
    return new Promise((resolve, reject) => {
        /*
         *  do something nasty
         */
    });
})
.then(result => {
    // will be executed when the previously created promise finishes execution
})
.catch(err => {
    // will be executed if the previously created promise fails
});
~~~~

## API

### `do(provider: () => Promise): Promise`

Places the passed promise provider function into the queue. Returns a promise which is resolved when the original promise is resolved.

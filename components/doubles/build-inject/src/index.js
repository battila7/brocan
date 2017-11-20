require('./config');

require('./messaging');

const Queue = require('./queue');
const Storage = require('./storage');

const readline = require('readline');

async function setup() {
  await Queue.setup();
}

function putBuild(build) {
  Storage.put(build.id, build);

  Queue.push(build.id);
}

(async () => {
  await setup();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on('line', (input) => {
     putBuild(JSON.parse(input)); 
  });
})();

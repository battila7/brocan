require('./config');

require('./messaging');

const Queue = require('./queue');
const Storage = require('./storage');

const readline = require('readline');

async function setup() {
  await Queue.setup();
}

function putBuild(build) {
  Storage.put(build.buildId, build);

  Queue.push(build.buildId);
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

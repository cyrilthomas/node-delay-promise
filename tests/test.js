const series = require('./series');
const parallel = require('./parallel');
const batch = require('./batch');

// A sample promise which takes an argument
function promise(name) {
    console.log('Begin task', name);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Finish task', name);
            return resolve();
        }, 1000);
    });
}

// Let's dance & sing some song
series(promise).then(() => parallel(promise)).then(() => batch(promise));
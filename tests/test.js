var Promise = require('bluebird');
var series = require('./series');
var parallel = require('./parallel');
var batch = require('./batch');

// A sample promise which takes an argument
function promise(name) {
    console.log('Begin task', name);
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Finish task', name);
            return resolve();
        }, 1000);
    });
};

// Let's dance
series(promise).then(function() {
   return parallel(promise);
}).then(function() {
    return batch(promise);
});
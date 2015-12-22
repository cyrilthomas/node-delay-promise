## Delay promise

A bluebird promise wrapper library to delay of promises as series or parallel

```javascript
var Promise = require('delay-promise');

var getDate = function() {
    return new Date().toJSON();
};

var runAsync = function(name, delay) {
    const deferred = Promise.defer();
    setTimeout(function() {
        console.log('Running Async ' + name + ' after delay ' + delay, getDate());
        return deferred.resolve(name);
    }, delay);
    return deferred.promise;
};

var start;
start = new Date();
Promise.Series([
    Promise.Creator(runAsync, 'Series A', 5000),
    Promise.Creator(runAsync, 'Series B', 4000),
    Promise.Creator(runAsync, 'Series C', 3000)
], 1000).done(function(promisesArray) {
    const end = new Date();
    console.log('Series total time', end - start);
});

start = new Date();
Promise.Parallel([
    Promise.Creator(runAsync, 'Parallel A', 5000),
    Promise.Creator(runAsync, 'Parallel B', 4000),
    Promise.Creator(runAsync, 'Parallel C', 3000)
], 1000).done(function(promisesArray) {
    var end = new Date();
    console.log('Parallel total time', end - start);
});

```

Both `Promise.Series` and `Promise.Parallel` accepts an array of `Promise.Creator` objects

`Promise.Creator` is a shorthand to

```javascript
// Function wrapper
function() {
    // return a promise
    return runAsync('Series A', 5000);
}

```

Or better written cleaner as

```javascript
Promise.Creator(runAsync, 'Parallel A', 5000)

```

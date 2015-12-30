## Delay promise

A bluebird promise wrapper library to delay of promises as series or parallel

```javascript
var Promise = require('delay-promise');

var getDate = function() {
    return new Date().toJSON();
};

// Async promise function
var runAsyncTask = function(name, runtime) {
    console.log('Begin task ' + name, getDate());
    const deferred = Promise.defer();
    setTimeout(function() {
        console.log('Finish task ' + name + ' after ' + runtime, getDate());
        return deferred.resolve(name);
    }, runtime);
    return deferred.promise;
};

var start;

// Create sequential tasks with a delay of 1 second between each task
start = new Date();
Promise.Series([
    Promise.Creator(runAsyncTask, 'Series A', 5000),
    Promise.Creator(runAsyncTask, 'Series B', 4000),
    Promise.Creator(runAsyncTask, 'Series C', 3000)
], 1000).done(function(promisesArray) {
    const end = new Date();
    console.log('Total time (series) -', end - start, promisesArray);
});

// Create parallel tasks with a delay of 1 second between each task
start = new Date();
Promise.Parallel([
    Promise.Creator(runAsyncTask, 'Parallel A', 5000),
    Promise.Creator(runAsyncTask, 'Parallel B', 4000),
    Promise.Creator(runAsyncTask, 'Parallel C', 3000)
], 1000).done(function(promisesArray) {
    var end = new Date();
    console.log('Total time (parallel) -', end - start, promisesArray);
});

```

Both `Promise.Series` and `Promise.Parallel` accepts an array of `Promise.Creator` objects

`Promise.Creator` is a shorthand to

```javascript
// Function wrapper
function() {
    // return a promise
    return runAsyncTask('Series A', 5000);
}

```

Or better written cleaner as

```javascript
Promise.Creator(runAsyncTask, 'Parallel A', 5000)

```


Batch promises using `Series` and `Parallel`

```javascript
// Create batches of async tasks
var batch1 = [
    Promise.Creator(runAsyncTask, 'task1', 1000),
    Promise.Creator(runAsyncTask, 'task2', 1000),
    Promise.Creator(runAsyncTask, 'task3', 1000)
]

var batch2 = [
    Promise.Creator(runAsyncTask, 'task4', 1000),
    Promise.Creator(runAsyncTask, 'task5', 1000),
    Promise.Creator(runAsyncTask, 'task6', 1000)
]

// run all tasks in a batch parallel with a delay of 2 seconds between batches
Promise.Series([
    Promise.Creator(Promise.Parallel, batch1),
    Promise.Creator(Promise.Parallel, batch2)
], 2000).then(function(batchArray) {
    console.log('Processed 2 batches', batchArray);
    // batchArray[0][0] = task1
    // batchArray[1][0] = task4
});

```
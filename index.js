var Promise = require('bluebird');

var delayedPromise = function(promiseCreator, ms) {
    return Promise.delay(ms).then(function() {
        return promiseCreator(); // creates the promise
    });
};

creator = function() {
    var slice = [].slice;
    var asyncFunc = arguments[0];
    var asyncFuncParams = 2 <= arguments.length ? slice.call(arguments, 1) : [];

    return function() {
        return asyncFunc.apply(null, asyncFuncParams);
    };
};

series = function(promiseCreatorArray, delay, delayFirst) {
    delay = delay ? delay : 0;
    delayFirst = delayFirst ? delayFirst : false;

    var chain = delayedPromise(promiseCreatorArray.shift(), delayFirst ? delay : 0);
    var values = [];

    promiseCreatorArray.forEach(function(promiseCreator) {
        chain = chain.then(function(value) {
            values.push(value); // push the previous chain result
            return delayedPromise(promiseCreator, delay);
        });
    });

    return chain.then(function(value) {
        values.push(value); // push the last chain result
        return values;
    });
};

parallel = function(promiseCreatorArray, delay, delayFirst) {
    delay = delay ? delay : 0;
    delayFirst = delayFirst ? delayFirst : false;

    var currentDelay = delay;
    var promises = [
        delayedPromise(promiseCreatorArray.shift(), delayFirst ? currentDelay : 0)
    ];

    currentDelay = delayFirst ? currentDelay + delay : currentDelay;

    promiseCreatorArray.forEach(function(promiseCreator) {
        promises.push(delayedPromise(promiseCreator, currentDelay));
        currentDelay += delay;
        return;
    });

    return Promise.all(promises);
};

module.exports = {
    creator: creator,
    series: series,
    parallel: parallel
};
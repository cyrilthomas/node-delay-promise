var Promise = require('./index');

var getDate = function() {
    return new Date().toJSON();
};

var runAsync = function(name, delay) {
    const deferred = Promise.defer();
    console.log('Triggered Async ' + name, getDate());
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
], 1000).done(function() {
    const end = new Date();
    console.log('Series total time', end - start);
});

start = new Date();
Promise.Parallel([
    Promise.Creator(runAsync, 'Parallel A', 5000),
    Promise.Creator(runAsync, 'Parallel B', 4000),
    Promise.Creator(runAsync, 'Parallel C', 3000)
], 1000).done(function() {
    var end = new Date();
    console.log('Parallel total time', end - start);
});

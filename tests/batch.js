var delayed = require('../index');

module.exports = function(promise) {
    var batch1 = delayed.creator(delayed.parallel, [
        delayed.creator(promise, 'batch task1'),
        delayed.creator(promise, 'batch task2'),
        delayed.creator(promise, 'batch task3')
    ], 1000); // 1 second delay between each parallel promise

    var batch2 = delayed.creator(delayed.parallel, [
        delayed.creator(promise, 'batch task4'),
        delayed.creator(promise, 'batch task5'),
        delayed.creator(promise, 'batch task6')
    ], 1000); // 1 second delay between each parallel promise

    // 1 second delay between each batch
    start  = new Date();

    console.log('---- Batch test ----');
    return delayed.series([ batch1, batch2 ], 1000).then(function(batchArray) {
        // Array of batches
        var end = new Date();
        console.log('---- Batched test completed in', end - start, '----');
    });
}

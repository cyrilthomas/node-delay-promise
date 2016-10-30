const delayed = require('../index');

module.exports = (promise) => {
  const start = new Date();

  console.log('---- Parallel test ----');
  return delayed.parallel([
    delayed.creator(promise, 'Parallel A'),
    delayed.creator(promise, 'Parallel B'),
    delayed.creator(promise, 'Parallel C'),
  ], 1000).then(() => {
    // returns an array of resolved values of the promises just like Promise.all
    const end = new Date();
    console.log('---- Parallel test completed in', end - start, '----');
  });
};


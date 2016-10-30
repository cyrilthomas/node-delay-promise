const delayed = require('../index');

module.exports = (promise) => {
  const start = new Date();

  console.log('---- Series test ----');
  return delayed.series([
    delayed.creator(promise, 'Series A'),
    delayed.creator(promise, 'Series B'),
    delayed.creator(promise, 'Series C'),
  ], 1000).then(() => {
    // returns an array of resolved values of the promises just like Promise.all
    const end = new Date();
    console.log('---- Series test completed in', end - start, '----');
  });
};

var pandoc = require('./pandoc.js');

pandoc('# Heading', 'markdown', 'html', function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

var pandoc = require('./pandoc.js');

// print markdown
pandoc('# Heading', 'markdown', 'html', function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

// show pandoc version
pandoc('', 'markdown', 'html', [ '-v' ],
    function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

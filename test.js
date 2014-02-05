var pdc = require('./pdc.js');

// print markdown
pdc('# Heading', 'markdown', 'html', function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

// show pandoc version
pdc('', 'markdown', 'html', [ '-v' ],
    function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

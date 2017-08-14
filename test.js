var fs = require('fs');
var pdc = require('./pdc.js');

// print markdown
pdc('# Heading', 'markdown', 'html', function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

// write docx
pdc('# Heading docx', 'markdown', 'docx', function (err, result) {
  if (err)
    throw err;
  fs.createWriteStream('test.docx').write(result);
});

// show pandoc version
pdc('', 'markdown', 'html', [ '-v' ],
    function (err, result) {
  if (err)
    throw err;
  console.log(result);
});

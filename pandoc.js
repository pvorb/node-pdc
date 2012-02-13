var spawn = require('child_process').spawn;

module.exports = pdc;

function pdc(src, srcType, destType, cb) {
  var args = [ '-f', srcType, '-t', destType ];
  var pandoc = spawn('pandoc', args);

  var result = '';
  var error = '';

  pandoc.stdout.on('data', function (data) {
    result += data;
  });
  pandoc.stderr.on('data', function (data) {
    error += data;
  });

  pandoc.on('exit', function (code) {
    if (code != 0)
      return cb(new Error('pandoc exitet with code '+code+'.'));
    if (error)
      return cb(new Error(error));

    cb(null, result);
  });

  pandoc.stdin.end(src, 'utf8');
}

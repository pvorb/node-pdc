var spawn = require('child_process').spawn;

module.exports = pdc;

// pdc(src, from, to[, opt], cb)
function pdc(src, from, to, opt, cb) {
  if (typeof cb == 'undefined')
    cb = opt;

  var args = [ '-f', from, '-t', to ];

  if (typeof opt == 'object')
    args = args.concat(opt);

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
    if (code != 0 && !err)
      return cb(new Error('pandoc exited with code '+code+'.'));
    if (error)
      return cb(new Error(error));

    cb(null, result);
  });

  pandoc.stdin.end(src, 'utf8');
}

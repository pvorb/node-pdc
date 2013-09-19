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
    var msg = '';
    if (code !== 0)
      msg += 'pandoc exited with code '+code+(error ? ': ' : '.');
    if (error)
      msg += error;

    if (msg)
      return cb(new Error(msg));

    cb(null, result);
  });

  pandoc.stdin.end(src, 'utf8');
}

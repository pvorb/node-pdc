var spawn = require('child_process').spawn;

module.exports = pdc;

// pdc(src, from, to, [args,] [opts,] cb)
function pdc(src, from, to, args, opts, cb) {
  var defaultArgs = [ '-f', from, '-t', to ];

  // sanitize arguments
  // no args, no opts
  if (arguments.length == 4) {
    cb = args;
    opts = null;
    args = defaultArgs;
  } else {
    // args, but no opts
    if (arguments.length == 5) {
      cb = opts;
      opts = null;
    }

    // concatenate arguments
    args = defaultArgs.concat(args);
  }

  // start pandoc (with or without options)
  var pandoc;
  if (opts === null)
    pandoc = spawn(pdc.path, args);
  else
    pandoc = spawn(pdc.path, args, opts);


  var result = '';
  var error = '';

  // collect result data
  pandoc.stdout.on('data', function (data) {
    result += data;
  });

  // collect error data
  pandoc.stderr.on('data', function (data) {
    error += data;
  });

  // listen on exit
  pandoc.on('exit', function (code) {
    var msg = '';
    if (code !== 0)
      msg += 'pandoc exited with code ' + code + (error ? ': ' : '.');
    if (error)
      msg += error;

    if (msg)
      return cb(new Error(msg));

    cb(null, result);
  });

  // finally, send source string
  pandoc.stdin.end(src, 'utf8');
}

// name of or path to pandoc executable
pdc.path = 'pandoc';

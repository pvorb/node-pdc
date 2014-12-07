var spawn = require('child_process').spawn;

module.exports = pdc;

// pdcStream(from, to, [args,] [opts])
function pdcStream(from, to, args, opts) {
  var defaultArgs = [ '-f', from, '-t', to ];

  // sanitize arguments
  // no args, no opts
  if (arguments.length == 2) {
    args = defaultArgs;
  } else {
    // concatenate arguments
    args = defaultArgs.concat(args);
  }

  // start pandoc (with or without options)
  var pandoc;
  if (typeof opts == 'undefined')
    pandoc = spawn(pdc.path, args);
  else
    pandoc = spawn(pdc.path, args, opts);

  return pandoc;
}

// pdc(src, from, to, [args,] [opts,] cb)
function pdc(src, from, to, args, opts, cb) {
  var pandoc;
  if (arguments.length == 4) {
    cb = args;
    pandoc = pdcStream(from, to);
  } else if (arguments.length == 5) {
    cb = opts;
    pandoc = pdcStream(from, to, args);
  } else {
    pandoc = pdcStream(from, to, args, opts);
  }

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
  pandoc.on('close', function (code) {
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

// export stream version
pdc.stream = pdcStream;

// name of or path to pandoc executable
pdc.path = 'pandoc';

# pdc

a pandoc wrapper for node.js

## Installation

~~~
npm install pdc
~~~

This package requires [pandoc](http://johnmacfarlane.net/pandoc/) to be
installed. By default, the wrapper assumes pandoc to be in `PATH`. You can set
your own, customized path to the executable by assigning an absolute path to
`pdc.path`.

## Usage

~~~ js
var pdc = require('pdc');

// optional, if pandoc is not in PATH
var path = require('path');
pdc.path = path.resolve(process.env.HOME, '.cabal/bin/pandoc');

pdc('# Heading', 'markdown', 'html', function(err, result) {
  if (err)
    throw err;

  console.log(result);
});
~~~

This will print:

~~~ html
<h1 id="heading">Heading</h1>
~~~

## API

~~~ js
pdc(src, from, to, [args,] [opts,] callback);
~~~

  * `src` is a string containing the entire source text, that shall be
    converted.
  * `from` is a string containing the type of the source text (e.g.
    `'markdown'`).
  * `to` is a string containing the type of the destination text (e.g.
    `'html'`).
  * `args` [optional] is an array with additional command line flags (e.g.
    `[ '-v' ]` for pandoc's version).
  * `opts` [optional] is an object with additional options for the process. See
    [the Node.js docs][spawn].
  * `callback` is a function that is called after parsing. It takes two
    arguments `(err, result)`, where `err` is an error or `null` and `result` is
    a string containing the converted text.

~~~ js
pdc.path = 'pandoc';
~~~

  * `pdc.path` is a string containing the name or absolute path to the
    executable. Defaults to `'pandoc'`.

~~~ js
pdc.stream(from, to, [args,] [opts])
~~~

This is an alternative way to run pandoc. If you need a way to manipulate the
streams, that's the way to go.

  * `from` is a string containing the type of the source text (e.g.
    `'markdown'`).
  * `to` is a string containing the type of the destination text (e.g.
    `'html'`).
  * `args` [optional] is an array with additional command line flags (e.g.
    `[ '-v' ]` for pandoc's version).
  * `opts` [optional] is an object with additional options for the process. See
    [the Node.js docs][spawn].
  * Returns a [ChildProcess], which allows you to use pandoc's `stdin`, `stdout`
    and `stderr`.

[spawn]: http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
[ChildProcess]: http://nodejs.org/api/child_process.html#child_process_class_childprocess

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](https://github.com/pvorb/node-pdc/issues).

## Credits

I’d like to thank [John MacFarlane](http://johnmacfarlane.net/) for creating
such a great tool -- It adds so many possibilities to Markdown -- and of course
[John Gruber](http://daringfireball.net/) for creating Markdown itself.

## License

Copyright © 2012-2014 Paul Vorbach

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

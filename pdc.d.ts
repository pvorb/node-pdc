// Type definitions for pdc 0.2
// Project: https://github.com/pvorb/node-pdc#readme

/// <reference types="node" />
import { ChildProcess } from 'child_process';

/*~ Note that ES6 modules cannot directly export callable functions.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ This declaration specifies that the function
 *~ is the exported object from the file
 */
export = pdc;

/**
 * @param src a string containing the entire source text, that shall be converted.
 * @param from a string containing the type of the source text (e.g. 'markdown').
 * @param to a string containing the type of the destination text (e.g. 'html').
 * @param cb  a function that is called after parsing. It takes two arguments (err, result), where err is an error or null and result is a string containing the converted text.
 */
declare function pdc(src: string, from: string, to: string, cb: (err: any, result: any) => void): void;

/**
 * @param src a string containing the entire source text, that shall be converted.
 * @param from a string containing the type of the source text (e.g. 'markdown').
 * @param to a string containing the type of the destination text (e.g. 'html').
 * @param args an array with additional command line flags (e.g. [ '-v' ] for pandoc's version).
 * @param cb  a function that is called after parsing. It takes two arguments (err, result), where err is an error or null and result is a string containing the converted text.
 */
declare function pdc(src: string, from: string, to: string, args: string[], cb: (err: any, result: any) => void): void;

/**
 * @param src a string containing the entire source text, that shall be converted.
 * @param from a string containing the type of the source text (e.g. 'markdown').
 * @param to a string containing the type of the destination text (e.g. 'html').
 * @param args an array with additional command line flags (e.g. [ '-v' ] for pandoc's version).
 * @param opts an object with additional options for the process. See http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options.
 * @param cb  a function that is called after parsing. It takes two arguments (err, result), where err is an error or null and result is a string containing the converted text.
 */
declare function pdc(src: string, from: string, to: string, args: string[], opts: any, cb: (err: any, result: any) => void): void;

declare namespace pdc {
    /**
     * a string containing the name or absolute path to the `pandoc` executable. Defaults to 'pandoc'.
     */
    let path: string;

    /**
     * @param from string containing the type of the source text (e.g. 'markdown').
     * @param to string containing the type of the destination text (e.g. 'html').
     * @param args array with additional command line flags (e.g. [ '-v' ] for pandoc's version).
     * @param opts object with additional options for the process. See http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options.
     */
    function stream(from: string, to: string, args?: string[], opts?: any): ChildProcess;
}

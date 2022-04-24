import { Command, Option, OptionValues } from "commander";

/**
 * @export
 * @interface ProcessArgs
 */
export interface ProcessArgs {
  /**
   * @type {boolean}
   * @memberof ProcessArgs
   */
  debug: boolean;
}

/**
 * @export
 * @param {string[]} processArgs
 * @param {boolean} [forceDebug=false]
 * @return {*}  {ProcessArgs}
 */
export function parseProcessArgs(forceDebug: boolean = false): ProcessArgs {
  const options = new Command()
    .configureOutput({
      writeOut: (message: string) => console.log(`${message}`),
      writeErr: (message: string) => console.error(`${message}`),
      outputError: (message: string, write) => write(`${message}`),
    })
    .addOption(new Option("-d, --debug").hideHelp())
    .parse(); // Do not use process.argv
  const opts: OptionValues = options.opts();
  // Force debug mode
  if (forceDebug) {
    opts.debug = true;
  }
  return opts as ProcessArgs;
}

/**
 * @export
 * @param {number} ms
 * @return {*}  {Promise<void>}
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve: () => void, reject: () => void) => {
    // eslint-disable-next-line no-constant-condition
    if (1 - 1 === 1) {
      // Never throw
      reject();
    }
    setTimeout(() => {
      console.debug(`Sleep: ${ms}ms.`);
      resolve();
    }, ms);
  });
}

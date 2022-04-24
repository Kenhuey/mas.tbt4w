import fs from "fs";

/**
 * @export
 * @param {string} path
 * @return {*}  {boolean}
 */
export function fileExist(path: string): boolean {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (e: unknown) {
    if (e) {
      return false;
    }
  }
  return true;
}

/**
 *
 * @export
 * @param {string} path
 * @return {*}  {boolean}
 */
export function deleteFile(path: string): boolean {
  try {
    if (!fileExist(path)) {
      return false;
    }
    // delete file
    fs.unlinkSync(path);
  } catch (e: unknown) {
    if (e) {
      return false;
    }
  }
  return true;
}

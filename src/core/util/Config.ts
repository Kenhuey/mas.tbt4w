/* eslint-disable @typescript-eslint/no-explicit-any */
import Store from "electron-store";
import Path from "path";

export const AppConfigSchema = {
  firstLoad: {
    type: "boolean",
    default: true,
  },
} as const;

/**
 * @class ConfigStore
 */
export class ConfigStore {
  /**
   * @private
   * @memberof ConfigStore
   */
  private readonly store;

  public get Store() {
    return this.store;
  }

  /**
   * @static
   * @return {*}  {string}
   * @memberof ConfigStore
   */
  public static getConfigRootDir(): string {
    return Path.join(process.cwd(), "configs");
  }

  /**
   * Creates an instance of ConfigStore.
   * @param {string} name
   * @param {*} schema
   * @param {string} [dir="\\"]
   * @param {(e: unknown) => void} [_errCallBack=(e) => {
   *       throw e;
   *     }]
   * @memberof ConfigStore
   */
  constructor(name: string, schema: any, dir: string = "\\") {
    this.store = new Store({
      schema: schema,
      cwd: Path.join(ConfigStore.getConfigRootDir(), dir),
      name: name,
      fileExtension: "json",
    });
  }
}

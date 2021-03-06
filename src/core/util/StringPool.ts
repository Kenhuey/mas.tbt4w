import { v4 as uuidv4 } from "uuid";

/**
 * @export
 * @class StringPool
 */
export class StringPool {
  /**
   * @private
   * @type {Map<string, string>}
   * @memberof StringMap
   */
  private readonly pool: Map<string, string>;

  /**
   * Creates an instance of StringPool.
   * @memberof StringPool
   */
  constructor() {
    this.pool = new Map();
  }

  /**
   * @param {string} text
   * @return {*}  {string} UUID
   * @memberof StringPool
   */
  public create(text: string): string {
    const uuid: string = uuidv4();
    this.update(uuid, text);
    return uuid;
  }

  /**
   * @param {string} uuid
   * @param {string} text
   * @memberof StringPool
   */
  public update(uuid: string, text: string): void {
    this.pool.set(uuid, text);
    console.debug(
      `Added a string "${this.get(uuid)}" with uuid "${uuid}" to pool.`
    );
  }

  /**
   * @param {string} uuid
   * @memberof StringPool
   */
  public remove(uuid: string): void {
    // const tempString: string = this.get(uuid);
    this.pool.delete(uuid);
    // console.debug(
    //   `Removed a string "${tempString}" with uuid "${uuid}" from pool.`
    // );
    console.debug(`Removed a string with uuid "${uuid}" from pool.`);
  }

  /**
   * @param {string} uuid
   * @return {*}  {string} Text or "undefined"
   * @memberof StringPool
   */
  public get(uuid: string): string {
    const text: string | undefined = this.pool.get(uuid);
    return text === undefined ? "undefined" : text;
  }
}

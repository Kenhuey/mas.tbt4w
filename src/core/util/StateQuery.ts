import { reactive } from "vue";
import { v4 as uuidv4 } from "uuid";

/**
 * Just for frontend, do not use it in Window's Ipcs
 * Todo: Append event listener to callback when query map updated.
 * @export
 * @class StateQuery
 */
export class StateQuery {
  /**
   * @memberof StateQuery
   */
  public readonly query = reactive(new Map<string, boolean>());

  /**
   * @return {*}  {string}
   * @memberof StateQuery
   */
  public createState(): string {
    const uuid: string = uuidv4();
    this.query.set(uuid, false);
    return uuid;
  }

  /**
   * @param {string} uuid
   * @memberof StateQuery
   */
  public finishState(uuid: string): void {
    this.query.delete(uuid);
  }

  /**
   * @return {*}  {boolean}
   * @memberof StateQuery
   */
  public isQueryDone(): boolean {
    return this.query.size === 0;
  }
}

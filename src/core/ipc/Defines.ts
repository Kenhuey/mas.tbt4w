import { BrowserWindowConstructorOptions } from "electron";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcRendererNames {
  export const WINDOW_MINIMIZE = "window-minimize";
  export const WINDOW_MAXIMIZE = "window-maximize";
  export const WINDOW_NORMALIZE = "window-normalize";
  export const WINDOW_CLOSE = "window-close";
  export const WINDOW_HIDE = "window-hide";
  export const WINDOW_CREATE = "window-create";
  export const IPC_STRING_POOL_APPEND = "ipc-string-pool-append";
  export const IPC_STRING_POOL_REMOVE = "ipc-string-pool-remove";
  export const IPC_STRING_POOL_GET = "ipc-string-pool-get";
  export const IPC_ASYNC_EVENT_DONE = "ipc-async-event-done";
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcRendererParams {
  /**
   * @export
   * @interface WINDOW_CREATE
   */
  export interface WINDOW_CREATE {
    bwcOptions: BrowserWindowConstructorOptions;
    windowViewPath: string;
    showWhenReady: boolean;
    focusWhenReady: boolean;
    whenShowReplyUuid: string;
    byParent?: boolean;
  }

  /**
   * @export
   * @interface IPC_STRING_POOL_APPEND
   */
  export interface IPC_STRING_POOL_APPEND {
    text: string;
  }

  /**
   * @export
   * @interface IPC_STRING_POOL_REMOVE
   */
  export interface IPC_STRING_POOL_REMOVE {
    uuid: string;
  }

  /**
   * @export
   * @interface IPC_STRING_POOL_GET
   */
  export interface IPC_STRING_POOL_GET {
    uuid: string;
  }
}

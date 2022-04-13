import { RendererProcessIpc } from "electron-better-ipc";
import { IpcRenderer } from "electron";
import { IpcRendererNames, IpcRendererParams } from "./Defines";

const ipcRenderer: RendererProcessIpc = eval("require")(
  "electron-better-ipc"
).ipcRenderer;

const ipcRendererRaw: IpcRenderer = eval("require")("electron").ipcRenderer;

/**
 * @export
 * @param {IpcRendererParams.WINDOW_CREATE} data
 * @return {*}  {Promise<boolean>}
 */
export async function callMainWindowCreate(
  data: IpcRendererParams.WINDOW_CREATE
): Promise<boolean> {
  return await ipcRenderer.callMain(IpcRendererNames.WINDOW_CREATE, data);
}

/**
 * Create a text alert window
 * Text cannot too long, query params of URL only support max length for 255(full URL)
 * Use string pool's uuid
 * @export
 * @param {(string | null)} [text=null]
 * @param {boolean} [byParent=true]
 * @return {*}  {Promise<boolean>}
 */
export async function callMainCreateTextAlert(
  text: string | null = null,
  whenShowReplyUuid: string,
  byParent: boolean = true
): Promise<boolean> {
  const spParams: IpcRendererParams.IPC_STRING_POOL_APPEND = {
    text: text === null ? "null" : text,
  };
  const spUuid = await ipcRenderer.callMain(
    IpcRendererNames.IPC_STRING_POOL_APPEND,
    spParams
  );
  const result = await callMainWindowCreate({
    bwcOptions: {
      width: 512,
      height: 160,
      frame: false,
      title: "Alert",
      resizable: false,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
        // partition: WindowBuilder.protocolName,
      },
      modal: true,
    },
    windowViewPath: "TextAlertWindow?spuuid=" + spUuid,
    showWhenReady: true,
    focusWhenReady: true,
    byParent: byParent,
    whenShowReplyUuid: whenShowReplyUuid,
  });
  return result;
}

/**
 * @export
 * @param {string} uuid
 * @param {() => void} callback
 */
export async function addOnceCallbackWhenMainCreateTextAlertShowReply(
  uuid: string,
  callback: () => void
) {
  ipcRendererRaw.once(
    IpcRendererNames.IPC_ASYNC_EVENT_DONE,
    (_event, replyUuid) => {
      if (replyUuid === uuid) {
        callback();
      }
    }
  );
}

/**
 *
 * @export
 * @param {string} uuid
 * @return {*}  {Promise<string>}
 */
export async function callMainGetTextFromStringPool(
  uuid: string
): Promise<string> {
  const spParams: IpcRendererParams.IPC_STRING_POOL_GET = {
    uuid: uuid,
  };
  const spText: string = await ipcRenderer.callMain(
    IpcRendererNames.IPC_STRING_POOL_GET,
    spParams
  );
  return spText;
}

/**
 * @export
 * @param {string} uuid
 * @return {*}  {Promise<string>}
 */
export async function callMainRemoveTextFromStringPool(
  uuid: string
): Promise<string> {
  const spParams: IpcRendererParams.IPC_STRING_POOL_REMOVE = {
    uuid: uuid,
  };
  const spText: string = await ipcRenderer.callMain(
    IpcRendererNames.IPC_STRING_POOL_REMOVE,
    spParams
  );
  return spText;
}

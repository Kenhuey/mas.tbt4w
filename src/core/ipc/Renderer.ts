import { RendererProcessIpc } from "electron-better-ipc";
import { IpcRendererNames, IpcRendererParams } from "./Defines";

const ipcRenderer: RendererProcessIpc = eval("require")(
  "electron-better-ipc"
).ipcRenderer;

export function callMainWindowCreate(
  data: IpcRendererParams.WINDOW_CREATE
): void {
  ipcRenderer.callMain(IpcRendererNames.WINDOW_CREATE, data);
}

/**
 * Create a text alert window
 * Text cannot too long, query params of URL only support max length for 255(full URL)
 * @export
 * @param {(string | null)} [text=null]
 * @param {boolean} [byParent=true]
 */
export async function callMainWindowCreateTextAlert(
  text: string | null = null,
  byParent: boolean = true
): Promise<void> {
  const spParams: IpcRendererParams.IPC_STRING_POOL_APPEND = {
    text: text === null ? "null" : text,
  };
  const spUuid = await ipcRenderer.callMain(
    IpcRendererNames.IPC_STRING_POOL_APPEND,
    spParams
  );
  callMainWindowCreate({
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
      },
      modal: true,
    },
    windowViewPath: "TextAlertWindow?spuuid=" + spUuid,
    showWhenReady: true,
    focusWhenReady: true,
    byParent: byParent,
  });
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

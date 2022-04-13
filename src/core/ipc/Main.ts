import { WindowBuilder } from "@/core/util/Window";
import { ipcMain } from "electron-better-ipc";
import { IpcRendererNames, IpcRendererParams } from "./Defines";
import { StringPool } from "@/core/util/StringPool";

/**
 * @export
 * @param {WindowBuilder} windowBuilder
 */
export function createIpcs(
  windowBuilder: WindowBuilder,
  ipcStringPool: StringPool
): void {
  // Close sender's window
  ipcMain.answerRenderer(
    IpcRendererNames.WINDOW_CLOSE,
    async (_data, browserWindow) => {
      browserWindow.destroy();
    }
  );

  // Hide sender's window
  ipcMain.answerRenderer(
    IpcRendererNames.WINDOW_HIDE,
    async (_data, browserWindow) => {
      browserWindow.hide();
    }
  );

  // Maxmize sender's window
  ipcMain.answerRenderer(
    IpcRendererNames.WINDOW_MAXIMIZE,
    async (_data, browserWindow) => {
      browserWindow.maximize();
    }
  );

  // Normalize(Restore) sender's window
  ipcMain.answerRenderer(
    IpcRendererNames.WINDOW_NORMALIZE,
    async (_data, browserWindow) => {
      browserWindow.restore();
    }
  );

  // Minimize sender's window
  ipcMain.answerRenderer(
    IpcRendererNames.WINDOW_MINIMIZE,
    async (_data, browserWindow) => {
      browserWindow.minimize();
    }
  );

  // Create custom window by renderer
  ipcMain.answerRenderer(
    IpcRendererNames.WINDOW_CREATE,
    async (data: IpcRendererParams.WINDOW_CREATE, browserWindow) => {
      if (data.byParent === true) {
        data.bwcOptions.parent = browserWindow;
      }
      windowBuilder.generateWindow(
        data.bwcOptions,
        data.windowViewPath,
        data.showWhenReady,
        data.focusWhenReady,
        () => {
          browserWindow.webContents.send(
            IpcRendererNames.IPC_ASYNC_EVENT_DONE,
            data.whenShowReplyUuid
          );
        }
      );
      return true;
    }
  );

  // Append text to ipc string pool
  ipcMain.answerRenderer(
    IpcRendererNames.IPC_STRING_POOL_APPEND,
    async (data: IpcRendererParams.IPC_STRING_POOL_APPEND) => {
      const uuid = ipcStringPool.create(data.text);
      return uuid;
    }
  );

  // Remove text from ipc string pool
  ipcMain.answerRenderer(
    IpcRendererNames.IPC_STRING_POOL_REMOVE,
    async (data: IpcRendererParams.IPC_STRING_POOL_REMOVE) => {
      ipcStringPool.remove(data.uuid);
    }
  );

  // Get text from ipc string pool
  ipcMain.answerRenderer(
    IpcRendererNames.IPC_STRING_POOL_GET,
    async (data: IpcRendererParams.IPC_STRING_POOL_GET) => {
      const text = ipcStringPool.get(data.uuid);
      return text;
    }
  );
}

import { WindowBuilder } from "@/core/util/Window";
import { app } from "electron";
import { createIpcs } from "@/core/ipc/Main";
import { StringPool } from "@/core/util/StringPool";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __static: string; /* Absolute path of main */

const isDevelopment = process.env.NODE_ENV !== "production";

// Quit event
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// Prevent muti-instances running
const MUTI_INSTANCE = app.requestSingleInstanceLock();
if (!MUTI_INSTANCE) {
  app.exit();
}

// Initialize
const windowBuilder = new WindowBuilder();

// Disable GPU acceleration
app.disableHardwareAcceleration();

// Electron ready
app.on("ready", async () => {
  // Create main window
  windowBuilder.generateWindow(
    {
      width: 1024,
      minWidth: 1024,
      height: 768,
      minHeight: 768,
      frame: false,
      title:
        "Tieba Tool For Windows" +
        `${isDevelopment ? " - [" + process.env.NODE_ENV + "]" : ""}`,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
      },
    },
    "MainWindow",
    true,
    true
  );
  // Create ipc string pool
  const ipcStringPool: StringPool = new StringPool();
  // Create ipc
  createIpcs(windowBuilder, ipcStringPool);
});

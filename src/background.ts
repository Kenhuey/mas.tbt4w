import { WindowBuilder } from "@/core/util/Window";
import { app } from "electron";
import { createIpcs } from "@/core/ipc/Main";
import { StringPool } from "@/core/util/StringPool";
import { LoggerFactory } from "@/core/util/LoggerFactory";
import { parseProcessArgs, ProcessArgs, sleep } from "@/core/util/Debug";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __static: string; /* Absolute path of main */

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * @param {string[]} args
 */
async function main(args: string[]): Promise<void> {
  // Options
  const options: ProcessArgs = parseProcessArgs(args, isDevelopment);
  // Logger
  LoggerFactory.initialization(options.debug);
  // Log basic infos
  console.log(`Args: ${JSON.stringify(options)}.`);
  console.log(`Asar path: "${__static}".`);
  /**
   * App quit event
   */
  function quit(): void {
    console.log("Quit.");
    app.quit();
  }
  // Quit event
  if (isDevelopment) {
    if (process.platform === "win32") {
      process.on("message", (data) => {
        if (data === "graceful-exit") {
          quit();
        }
      });
    } else {
      process.on("SIGTERM", () => {
        quit();
      });
    }
  }
  // Prevent muti-instances running
  const MUTI_INSTANCE = app.requestSingleInstanceLock();
  if (!MUTI_INSTANCE) {
    console.log("Exit cause by reason: muti-instances.");
    await sleep(1000);
    app.exit();
    return;
  }
  // Initialize window
  const windowBuilder = new WindowBuilder();
  // Disable GPU acceleration
  app.disableHardwareAcceleration();
  // Electron ready
  app.on("ready", async () => {
    // Create main window
    const minWidth = 832;
    const minHeight = 608;
    windowBuilder.generateWindow(
      {
        width: minWidth,
        minWidth: minWidth,
        height: minHeight,
        minHeight: minHeight,
        frame: false,
        title:
          "Tieba Tool For Windows" +
          `${isDevelopment ? " - [" + process.env.NODE_ENV + "]" : ""}`,
        webPreferences: {
          enableRemoteModule: true,
          nodeIntegration: true,
          contextIsolation: false,
          // partition: WindowBuilder.protocolName,
        },
      },
      "MainWindow/mw-overview",
      true,
      true,
      options.debug as boolean
    );
    // Create ipc string pool
    const ipcStringPool: StringPool = new StringPool();
    // Create ipc
    createIpcs(windowBuilder, ipcStringPool, options.debug as boolean);
  });
}

// Run
main(process.argv);

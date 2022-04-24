import { WindowBuilder } from "@/core/util/Window";
import { app } from "electron";
import { createIpcs } from "@/core/ipc/Main";
import { StringPool } from "@/core/util/StringPool";
import { LoggerFactory } from "@/core/util/LoggerFactory";
import { parseProcessArgs, ProcessArgs, sleep } from "@/core/util/Debug";
import { ConfigStore, AppConfigSchema } from "@/core/util/Config";
import { deleteFile } from "@/core/util/File";
import Path from "path";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __static: string; /* Absolute path of main */

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * App quit event
 */
function quit(): void {
  console.log("Quit.");
  app.quit();
}

/**
 * @param {string[]} args
 */
async function main(args: string[]): Promise<void> {
  // Options
  const options: ProcessArgs = parseProcessArgs(args, isDevelopment);
  // Logger
  LoggerFactory.initialization(options.debug);
  // Log basic infos
  console.log(`Args = ${JSON.stringify(options)}`);
  console.log(`Asar path: "${__static}".`);
  console.log(`Current working directory: "${process.cwd()}".`);
  console.log(`App config store: "${ConfigStore.getConfigRootDir()}".`);
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
  const windowBuilder: WindowBuilder = new WindowBuilder();
  // Disable GPU acceleration
  app.disableHardwareAcceleration();
  // Electron ready
  app.on("ready", async () => {
    // Create app config
    const appConfigFileName: string = "app";
    let appConfigStore: ConfigStore;
    try {
      appConfigStore = new ConfigStore(
        appConfigFileName,
        AppConfigSchema,
        "\\"
      );
      console.log(`App config = ${JSON.stringify(appConfigStore.Store.store)}`);
      appConfigStore.Store.set("firstLoad", false);
    } catch (e: unknown) {
      console.error("App config file generate failed.");
      console.error(e);
      // Delete original app config file
      deleteFile(
        Path.join(ConfigStore.getConfigRootDir(), `${appConfigFileName}.json`)
      );
      // Restart
      console.log("Re-launch cause by reason: App config load failed.");
      await sleep(1000);
      app.relaunch();
      app.exit();
      return;
    }
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

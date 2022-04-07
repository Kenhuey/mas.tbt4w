import {
  protocol,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

/**
 * @export
 * @class WindowBuilder
 */
export class WindowBuilder {
  /**
   * @memberof WindowBuilder
   */
  public readonly protocolName = "app";

  /**
   * @private
   * @static
   * @memberof WindowBuilder
   */
  private static initialized = false;

  /**
   * @private
   * @static
   * @memberof WindowBuilder
   */
  private static protocoliInitialized = false;

  /**
   * Creates an instance of WindowBuilder.
   * @memberof WindowBuilder
   */
  constructor() {
    if (WindowBuilder.initialized) {
      throw new Error(
        `"${WindowBuilder.name}" is already initialize, only allow to exist one instance.`
      );
    } else {
      // Register protocal schmes
      protocol.registerSchemesAsPrivileged([
        {
          scheme: this.protocolName,
          privileges: {
            secure: true,
            standard: true,
            allowServiceWorkers: true,
          },
        },
      ]);
      // Disable default menu
      Menu.setApplicationMenu(null);
      // Set once call flag
      WindowBuilder.initialized = true;
    }
  }

  /**
   * @param {BrowserWindowConstructorOptions} bwcOptions
   * @param {string} windowViewPath
   * @param {boolean} showWhenReady
   * @param {boolean} focusWhenReady
   * @return {*}  {BrowserWindow}
   * @memberof WindowBuilder
   */
  public generateWindow(
    bwcOptions: BrowserWindowConstructorOptions,
    windowViewPath: string,
    showWhenReady: boolean,
    focusWhenReady: boolean
  ): BrowserWindow {
    // Create window
    const window = new BrowserWindow(bwcOptions);
    // Load web content to window
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Dev mode
      window.loadURL(
        (process.env.WEBPACK_DEV_SERVER_URL as string) + "#/" + windowViewPath
      );
    } else {
      // Create protocol
      if (!WindowBuilder.protocoliInitialized) {
        // Only create once
        createProtocol(this.protocolName);
        // Set once call flag
        WindowBuilder.protocoliInitialized = true;
      }
      // Builded mode
      window.loadURL(`${this.protocolName}://./index.html#/${windowViewPath}`);
    }
    // TODO: Only open in dev/debug mod
    window.webContents.openDevTools({ mode: "detach" });
    // Prevent blank view when starting
    window.hide();
    window.on("ready-to-show", () => {
      if (showWhenReady) {
        window.show();
      }
      if (focusWhenReady) {
        window.focus();
      }
    });
    // Return
    return window;
  }
}
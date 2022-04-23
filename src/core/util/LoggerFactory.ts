import Log4js from "log4js";

export type Logger = Log4js.Logger;

/**
 * Background logger factory(Do not use it in renderer)
 * @export
 * @class LoggerFactory
 */
export class LoggerFactory {
  /**
   * @private
   * @static
   * @type {Logger}
   * @memberof LoggerFactory
   */
  private static consoleLogger: Logger;

  /**
   * @readonly
   * @private
   * @static
   * @type {Logger}
   * @memberof LoggerFactory
   */
  private static get ConsoleLogger(): Logger | undefined {
    return LoggerFactory.consoleLogger;
  }

  /**
   * @static
   * @return {*}  {typeof LoggerFactory}
   * @memberof LoggerFactory
   */
  public static initialization(debug: boolean): typeof LoggerFactory {
    if (LoggerFactory.consoleLogger !== undefined) {
      return LoggerFactory;
    }
    // Configs
    const datePattern: string =
      "[%d{yyyy-MM-dd hh:mm:ss}] [%p] <%h %z> %c - %m";
    Log4js.configure({
      appenders: {
        file: {
          type: "dateFile",
          filename: `logs/${Date.now()}`,
          pattern: "yyyy-MM-dd.log",
          alwaysIncludePattern: true,
          encoding: "utf-8",
          layout: {
            type: "pattern",
            pattern: datePattern,
          },
        },
        console: {
          type: "console",
          layout: {
            type: "pattern",
            pattern: datePattern,
          },
        },
      },
      categories: {
        default: {
          appenders: ["console", "file"],
          level: "ALL",
          enableCallStack: true,
        },
      },
    });
    // Replace default console output levels
    LoggerFactory.consoleLogger = Log4js.getLogger("main");
    console.log = LoggerFactory.consoleLogger.info.bind(
      LoggerFactory.consoleLogger
    );
    console.info = LoggerFactory.consoleLogger.info.bind(
      LoggerFactory.consoleLogger
    );
    console.warn = LoggerFactory.consoleLogger.warn.bind(
      LoggerFactory.consoleLogger
    );
    console.error = LoggerFactory.consoleLogger.error.bind(
      LoggerFactory.consoleLogger
    );
    console.trace = LoggerFactory.consoleLogger.trace.bind(
      LoggerFactory.consoleLogger
    );
    if (debug) {
      console.debug = LoggerFactory.consoleLogger.debug.bind(
        LoggerFactory.consoleLogger
      );
    }
    // Done
    return LoggerFactory;
  }

  /**
   * @private
   * @type {Logger}
   * @memberof LoggerFactory
   */
  private customLogger: Logger;

  /**
   * @readonly
   * @type {Logger}
   * @memberof LoggerFactory
   */
  public get logger(): Logger {
    return this.customLogger;
  }

  /**
   * Creates an instance of LoggerFactory.
   * @param {string} loggerName
   * @memberof LoggerFactory
   */
  public constructor(loggerName: string) {
    if (LoggerFactory.ConsoleLogger === undefined) {
      throw new Error("Logger not ready.");
    }
    LoggerFactory.ConsoleLogger.info(`Logger "${loggerName}" created.`);
    this.customLogger = Log4js.getLogger(loggerName);
  }
}

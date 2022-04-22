import Log4js from "log4js";

export type Logger = Log4js.Logger;

// TODO: 没写完，记得写，添加多线程之后记得多封装一个轮子方法生成thread-name（或许不用在这里实现，可以直接在多线程TASK封装，反正这东西也就我自己用）

/**
 * Background logger factory(Do not use it in renderer)
 * @export
 * @class LoggerFactory
 */
export class LoggerFactory {
  /**
   * @private
   * @static
   * @type {Log4js.Logger}
   * @memberof LoggerFactory
   */
  private static consoleLogger: Log4js.Logger;

  /**
   * @readonly
   * @static
   * @type {Logger}
   * @memberof LoggerFactory
   */
  private static get ConsoleLogger(): Logger {
    return LoggerFactory.initialization().consoleLogger;
  }

  /**
   * @private
   * @static
   * @return {*}  {typeof LoggerFactory}
   * @memberof LoggerFactory
   */
  private static initialization(): typeof LoggerFactory {
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
          filename: `logs/output`,
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
    LoggerFactory.consoleLogger = Log4js.getLogger("console");
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
    console.debug = LoggerFactory.consoleLogger.debug.bind(
      LoggerFactory.consoleLogger
    );
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
    LoggerFactory.ConsoleLogger.info(`Logger "${loggerName}" created.`);
    this.customLogger = Log4js.getLogger(loggerName);
  }
}

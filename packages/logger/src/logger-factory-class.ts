export interface ILogger {
  info(...args: unknown[]): void;
  warm(...args: unknown[]): void;
  debug(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

export class ProductionLogger implements ILogger {
  warm(args: unknown): void {
    console.warn(args);
  }
  error(args: unknown): void {
    // console.error(args);
  }
  info(args: unknown): void {
    console.log(args);
  }
  debug(args: unknown): void {
    // console.debug(args);
  }
}

export class DevelopmentsLogger implements ILogger {
  info(args: unknown): void {
    console.log(args);
  }
  warm(args: unknown): void {
    console.warn(args);
  }
  debug(args: unknown): void {
    console.debug(args);
  }
  error(args: unknown): void {
    console.error(args);
  }
}

// * return factory pattern of the logger
export class SuraLoggerFactory {
  public static createLogger(): ILogger {
    if (process.env.NODE_ENV === "production") {
      return new ProductionLogger();
    } else {
      return new DevelopmentsLogger();
    }
  }
}

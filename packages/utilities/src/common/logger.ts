type Color = "#FFFFFF" | "#FF0000" | "#0000FF";

const isProductionBypass =
  process.env.DEBUG === "true"
    ? true
    : process.env.NODE_ENV === "development"
    ? false
    : true;

export class Logger {
  static big(...args: unknown[]) {
    setTimeout(
      console.log.bind(
        console,
        `%c${args[0]}\n`,
        "color: #FF00FF;font-size: 60px;",
        args.slice(1)
      ),
      0
    );
  }
  static log(...args: unknown[]) {
    isProductionBypass ? null : console.log(...args);
  }
  static data(...args: unknown[]) {
    isProductionBypass
      ? null
      : console.log(
          `%c ${JSON.stringify(args, null, 2)}! `,
          "background: #222; color: #bada55"
        );
  }
  static info(...data: any[]): void {
    isProductionBypass ? null : console.log(data);
  }
  static error(...data: any[]): void {
    isProductionBypass ? null : console.error(data);
  }
  static warn(...data: any[]): void {
    isProductionBypass ? null : console.warn(data);
  }
  static color(color: Color, ...args: unknown[]) {
    const WHITE: Color = "#FFFFFF";
    const RED: Color = "#FF0000";
    const BLUE: Color = "#0000FF";
    const colorBook = [WHITE, RED, BLUE];
    const selectColor = colorBook.find((c) => c === color);
    isProductionBypass
      ? null
      : console.log(
          `%c ${JSON.stringify(args, null, 2)}! `,
          `background: #222; color: ${selectColor}`
        );
  }
}

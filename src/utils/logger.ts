export type LogLevel = "Trace" | "Info" | "Warn" | "Error" | "Fatal";

export type LogEvent = {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
};

export interface LogStrategy {
  log(event: LogEvent): void;
}

export class ConsoleLogStrategy implements LogStrategy {
  log(event: LogEvent): void {
    const prefix = `[${event.timestamp}] ${event.level}`;
    const payload = event.data ? { message: event.message, ...event.data } : event.message;

    switch (event.level) {
      case "Trace":
        console.debug(prefix, payload);
        break;
      case "Info":
        console.info(prefix, payload);
        break;
      case "Warn":
        console.warn(prefix, payload);
        break;
      case "Error":
        console.error(prefix, payload);
        break;
      case "Fatal":
        console.error(prefix, payload);
        break;
      default:
        console.log(prefix, payload);
    }
  }
}

export class RemoteLogStrategy implements LogStrategy {
  log(_event: LogEvent): void {
    // TODO: send to remote logging endpoint
  }
}

export class Logger {
  private strategies: LogStrategy[];

  constructor(strategies: LogStrategy[]) {
    this.strategies = strategies;
  }

  setStrategies(strategies: LogStrategy[]) {
    this.strategies = strategies;
  }

  trace(message: string, data?: Record<string, unknown>) {
    this.emit("Trace", message, data);
  }

  info(message: string, data?: Record<string, unknown>) {
    this.emit("Info", message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.emit("Warn", message, data);
  }

  error(message: string, data?: Record<string, unknown>) {
    this.emit("Error", message, data);
  }

  fatal(message: string, data?: Record<string, unknown>) {
    this.emit("Fatal", message, data);
  }

  private emit(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const event: LogEvent = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    for (const strategy of this.strategies) {
      strategy.log(event);
    }
  }
}

export const logger = new Logger([new ConsoleLogStrategy()]);


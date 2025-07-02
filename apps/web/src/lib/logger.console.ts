/* eslint-disable no-console */
import type { LogEntry, LogLevel, Transport } from "@/config/logger";

import { LOG_LEVELS } from "@/config/logger";

export type ConsoleTransportOptions = {
  level?: LogLevel;
};

/**
 * Console transport for logging.
 * Outputs log entries to the console.
 */
export class ConsoleTransport implements Transport {
  public level: LogLevel;

  constructor(options: ConsoleTransportOptions = {}) {
    this.level = options.level || "INFO";
  }

  public log(entry: LogEntry): void {
    const { level, messages } = entry;

    // Check if the log level is enabled for this transport
    if (entry.level < LOG_LEVELS[this.level])
      return; // If the log level is not enabled, do not log

    const formattedMessages = this.formatMessages(messages);
    const timestamp = this.formatTimestamp(entry);

    // Output to console with appropriate method based on log level
    switch (level) {
      case LOG_LEVELS.DEBUG:
        console.debug(`[${timestamp}] ${entry.loggerName}: ${formattedMessages}`);
        break;
      case LOG_LEVELS.INFO:
        console.info(`[${timestamp}] ${entry.loggerName}: ${formattedMessages}`);
        break;
      case LOG_LEVELS.WARN:
        console.warn(`[${timestamp}] ${entry.loggerName}: ${formattedMessages}`);
        break;
      case LOG_LEVELS.ERROR:
        console.error(`[${timestamp}] ${entry.loggerName}: ${formattedMessages}`);
        break;
      default:
        console.log(`[${timestamp}] ${entry.loggerName}: ${formattedMessages}`);
    }
  }

  private formatMessages(messages: any[]): string {
    return messages
      .map((msg) => {
        if (typeof msg === "string") {
          return msg;
        }
        if (msg instanceof Error) {
          return msg.stack || msg.message; // Prefer stack trace if available
        }
        // Attempt to stringify objects/arrays, handle potential circular refs
        try {
          return JSON.stringify(msg, null, 2);
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
        catch (error) {
          return "[Unserializable Object]";
        }
      })
      .join(" "); // Join multiple messages with a space
  }

  private formatTimestamp(entry: LogEntry): string {
    return entry.timestamp.toLocaleTimeString();
  }
}

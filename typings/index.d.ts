interface Logger {
  setConfig(opts: Settings): Logger;
  getAdapter(): Adapter;
  getStringFromObject(object: object): string;
  send(message: string, callback: (error?: Error, packetLength?: number) => void): void;
  message(message: string, lvl: number, extra: any, callback: (error?: Error, packetLength?: number) => void): void;
}

interface Adapter {
  setOptions(options: any): Adapter;
  send(message: string, callback: (error?: Error, packetLength?: number) => void): void;
}

interface Settings {
  /**
   * Default fields for all messages.
   */
  fields?: { [key: string]: any };
  /**
   * Filter functions, return false in any of them to not send the log message.
   */
  filter?: Array<(message: any) => boolean>;
  /**
   * Transformer methods, to transform log message.
   */
  transform?: Array<(message: any) => any>;
  /**
   * @default {emergency: 0, alert: 1, critical: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7}
   */
  levels?: { [levelName: string]: number };
  /**
   * @default {emergency: 0, alert: 1, critical: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7}
   */
  aliases?: { [allias: string]: string };
  /**
   * @default udp
   */
  adapterName: "tcp-tls" | "tcp" | "udp";
  adapterOptions: {
    /**
     * @default 127.0.0.1
     */
    host?: string;
    /**
     * @default 12201
     */
    port?: number;
    /**
     * @default 4
     */
    family?: number;
    /**
     * @default 1000
     */
    timeout?: number;
    /**
     * @default udp4
     */
    protocol?: "udp4" | "udp6";

    /**
     * tcp-tls only
     * only if using the client certificate authentication
     */
    key?: string;
    /**
     * tcp-tls only
     * only if using the client certificate authentication
     */
    cert?: string;
    /**
     * tcp-tls only
     * only if using the client certificate authentication
     */
    ca?: string;
  };
}

declare var instance: Logger;
export default instance;

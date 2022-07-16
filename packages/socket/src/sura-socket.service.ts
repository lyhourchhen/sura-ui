import io from "socket.io-client";
import {
  SuraSocketContextInterface,
  useSuraSocketProvider,
} from "./sura-socket-provider";

export interface SocketFn {
  key: string;
  fn: (data: any) => void;
}

export interface SocketServiceInterface {
  connectAndListen: () => void;
  overrideListener: (socketFn: SocketFn) => void;
  addListener: (socketFn: SocketFn) => void;
}

class SocketService implements SocketServiceInterface {
  private socket: SocketIOClient.Socket;
  private listeners: Set<SocketFn>;
  private token: string;
  // private isLogger: boolean;
  private autoConnect;

  constructor({
    socketRoute: socket_route,
    token,
    autoConnect,
  }: // isLogger,
  SuraSocketContextInterface & {
    autoConnect?: boolean;
    // isLogger?: boolean;
  }) {
    this.autoConnect = autoConnect;
    this.listeners = new Set();
    this.token = token;
    this.socket = io(socket_route, {
      query: {
        token: token,
      },
    });
    // this.isLogger = isLogger ?? false;
    if (this.autoConnect) this.connectAndListen();
  }

  // private logger = (text: any, isLogger: boolean) => {
  //   if (isLogger) {
  //     console.log(text);
  //   }
  // };

  connectAndListen() {
    this.socket.on("authentication", () => {
      // this.logger(
      //   `Socket authentication: ${JSON.stringify(data)}`,
      //   this.isLogger
      // );
    });
    this.socket.on("disconnect", () => {
      // this.logger(`Socket disconnect:  ${reason}`, this.isLogger);
    });
    this.socket.on(this.token, (data: any) => {
      for (const socketFn of this.listeners) {
        socketFn.fn(data);
      }
    });
  }

  overrideListener(socketFn: SocketFn) {
    this.listeners.clear();
    this.listeners.add(socketFn);
  }

  addListener(socketFn: SocketFn) {
    let listenerExist = false;
    for (const listener of this.listeners) {
      if (socketFn.key === listener.key) {
        listenerExist = true;
      }
    }
    if (!listenerExist) {
      this.listeners.add(socketFn);
    }
  }
}

// * Main
export const useSuraSocket = () => {
  const context = useSuraSocketProvider()!!;
  return new SocketService({
    // isLogger: logger,
    autoConnect: context.autoConnect ?? true,
    socketRoute: context?.socketRoute,
    token: context?.token,
  });
};

import SocketIoClient from "socket.io-client";
import { createContext, useContext } from "react";

const WS_Server = "http://localhost:3000";

const SocketContext = createContext<any | null>(null);
const socket = SocketIoClient(WS_Server);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

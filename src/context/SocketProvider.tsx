import { PropsWithChildren, createContext } from "react";

const SocketContext = createContext({});

export default function SocketProvider({ children }: PropsWithChildren) {
    return (
        <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
    );
}

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

const SOCKET_REDUCER_NAME = "socket-reducer-name";

const SocketInitialState: { socket: null | Socket; isConnected: boolean } = {
    socket: null,
    isConnected: false,
};

const socketReducer = createSlice({
    name: SOCKET_REDUCER_NAME,
    initialState: SocketInitialState,
    reducers: {
        setSocketInstance(state, { payload }: PayloadAction<Socket | null>) {
            return { ...state, socket: payload };
        },
        setSocketConnected(state, { payload }: PayloadAction<boolean>) {
            return { ...state, isConnected: payload };
        },
    },
});

export const { setSocketInstance, setSocketConnected } = socketReducer.actions;

export default socketReducer.reducer;

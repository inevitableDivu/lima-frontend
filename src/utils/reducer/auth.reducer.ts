import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IError } from "../../types";
import type { IAuthState, IUserDetails, IUserInfo } from "../../types/reducer";

export const AUTH_REDUCER_NAME = "auth-reducer-persisted";

export const authInitialState: IAuthState = {
    error: null,
    isAuthenticated: false,
    user: null,
    isLoading: true,
    details: null,
};

export function makeid(length: number) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

export const registerNewUser = createAsyncThunk(
    AUTH_REDUCER_NAME + "/registerNewUser",
    async (user: FirebaseAuthTypes.User) => {
        try {
            const data = {
                displayName: user.displayName ?? null,
                firstName: user.displayName?.split(" ")[0] ?? null,
                lastName: user.displayName?.split(" ")[1] ?? null,
                phoneNumber: user.phoneNumber ?? null,
                email: user.email ?? null,
                uid: user.uid ?? null,
                gender: null,
                age: null,
                avatar: "OLIVIA",
                avatarName: "Olivia",
            };

            return {
                type: "success",
                response: data,
            };
        } catch (error) {
            auth().currentUser?.delete();
            return {
                type: "error",
                response: null,
            };
        }
    }
);

const authReducer = createSlice({
    name: AUTH_REDUCER_NAME,
    initialState: authInitialState,
    reducers: {
        setNewUser(
            state,
            action: PayloadAction<{ uid: string; isNew: boolean }>
        ) {
            if (state.user) {
                state.user.isNewUser = action.payload.isNew;
            }

            return state;
        },
        setUser(state, action: PayloadAction<IUserInfo>) {
            return {
                ...state,
                user: action.payload
                    ? {
                          ...state.user,
                          displayName: action.payload.displayName,
                          email: action.payload.email,
                          emailVerified: action.payload.emailVerified,
                          isAnonymous: action.payload.isAnonymous,
                          metadata: action.payload.metadata,
                          phoneNumber: action.payload.phoneNumber,
                          photoURL: action.payload.photoURL,
                          providerData: action.payload.providerData,
                          providerId: action.payload.providerId,
                          uid: action.payload.uid,
                          isNewUser: Boolean(action.payload.isNewUser),
                      }
                    : null,
                isAuthenticated: Boolean(action.payload),
            };
        },
        setUserDetails(state, action: PayloadAction<IUserDetails | null>) {
            state.details = action.payload;
            return state;
        },
        setLoadingState(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
            return state;
        },
        setError(state, action: PayloadAction<IError>) {
            state.error = action.payload;
            return state;
        },
    },
    extraReducers(builder) {
        builder.addCase(registerNewUser.fulfilled, (state, { payload }) => {});
    },
});

export const {
    setLoadingState,
    setUser,
    setNewUser,
    setError,
    setUserDetails,
} = authReducer.actions;

export default authReducer.reducer;

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Socket } from "socket.io-client";
import { IError } from ".";

export type IGenderType = "MALE" | "FEMALE" | "OTHERS" | null;

export type IUser = {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: FirebaseAuthTypes.UserMetadata;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: FirebaseAuthTypes.UserInfo[];
    providerId: string;
    uid: string;
    isNewUser?: boolean;
};

export type IUserInfo = IUser | null;

export type IRoleType = "STUDENT" | "LIBRARIAN";

export type IUserDetails = {
    role?: IRoleType;
    uid?: string;
    displayName?: string | null;
    gender?: IGenderType;
    photoURL?: string | null;
    phoneNumber?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    isBlackListed?: boolean;
    isAdmin: boolean;
};

export type IAuthState = {
    error: IError;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: IUserInfo;
    details: IUserDetails | null;
};

export type Unarray<T> = T extends Array<infer U> ? U : T;

export type IAvatarState = "LISTENING" | "THINKING" | "SPEAKING" | "NEUTRAL";

export type ICallModeTypes = "VIDEO" | "CHAT";

export type ICustomSocket = Socket<{ EMO_SCR: any }, { INPUT_TXT: any }> | null;

/******************************* BOOKS REDUCER *******************************/

export type IBooksState = {
    latestArrival: IBook[];
    mostIssued: IBook[];
    search: string;
    bookmarks: IBook[];
    issuedBooks: IBook[];
    profile: {
        fineAmount: number;
        numOfBooksInShelf: number;
    };
    currentBook: IBook | null;
};

export type IBook = {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    author: string;
    publishedYear?: number;
    numOfPages: number;
    description?: string;
    genre: string[];
    cover: string;
    blurHash: string;
    isAvailable: boolean;
    issuedCount: number;
    borrower: string | null;
    dueDate: Date | null;
};

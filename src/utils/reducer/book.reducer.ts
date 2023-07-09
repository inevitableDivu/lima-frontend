import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { IBook, IBooksState } from "../../types/reducer";

const BOOK_REDUCER_NAME = "book-reducer-persister";

const booksInitialState: IBooksState = {
    latestArrival: [],
    mostIssued: [],
    bookmarks: [],
    issuedBooks: [],
    profile: {
        fineAmount: 0,
        numOfBooksInShelf: 0,
    },
    search: "",
    currentBook: null,
};

const bookReducer = createSlice({
    name: BOOK_REDUCER_NAME,
    initialState: booksInitialState,
    reducers: {
        setLatestArrival(state, { payload }: PayloadAction<IBook[]>) {
            return { ...state, latestArrival: payload };
        },
        setMostIssued(state, { payload }: PayloadAction<IBook[]>) {
            return { ...state, mostIssued: [...payload] };
        },
        setSearchText(state, { payload }: PayloadAction<string>) {
            return { ...state, search: payload };
        },
        addBookInBookmark(state, { payload }: PayloadAction<IBook>) {
            return { ...state, bookmarks: [payload, ...state.bookmarks] };
        },
        removeBookmark(state, { payload }: PayloadAction<{ _id: string }>) {
            return {
                ...state,
                bookmarks: state.bookmarks.filter((item) =>
                    item._id === payload._id ? null : item
                ),
            };
        },
        clearBookmarks(state) {
            return { ...state, bookmarks: [] };
        },
        updateBook(state, { payload }: PayloadAction<IBook>) {
            const bookmarks = state.bookmarks.map((book) => {
                if (book._id === payload._id) return payload;
                return book;
            });

            const currentBook =
                state.currentBook?._id === payload._id
                    ? { ...payload }
                    : state.currentBook;

            return {
                ...state,
                bookmarks,
                currentBook,
            };
        },
        updateBookIssue(state, { payload }: PayloadAction<IBook>) {
            const newArr = state.bookmarks.map((book) => {
                if (book._id === payload._id) return payload;
                return book;
            });
            return {
                ...state,
                bookmarks: newArr,
                issuedBooks: [payload, ...state.issuedBooks],
                currentBook:
                    state.currentBook?._id === payload._id
                        ? payload
                        : state.currentBook,
            };
        },
        addNewBookArrival(state, { payload }: PayloadAction<IBook>) {
            const newArr = [payload, ...state.latestArrival];
            return {
                ...state,
                latestArrival: newArr,
            };
        },
        setCurrentBook(state, { payload }: PayloadAction<IBook>) {
            return { ...state, currentBook: payload };
        },
        bookReturned(
            state,
            { payload }: PayloadAction<{ book: IBook; fineAmount: number }>
        ) {
            const issuedBooks = [...state.issuedBooks].filter((book) =>
                book._id === payload.book._id ? null : book
            );

            const newArr = state.bookmarks.map((book) => {
                if (book._id === payload.book._id) return payload.book;
                return book;
            });

            return {
                ...state,
                issuedBooks,
                bookmarks: newArr,
                currentBook:
                    state.currentBook?._id === payload.book._id
                        ? payload.book
                        : state.currentBook,
            };
        },
    },
});

export const {
    setLatestArrival,
    setMostIssued,
    setSearchText,
    addBookInBookmark,
    updateBook,
    removeBookmark,
    updateBookIssue,
    addNewBookArrival,
    setCurrentBook,
    bookReturned,
    clearBookmarks,
} = bookReducer.actions;

export default bookReducer.reducer;

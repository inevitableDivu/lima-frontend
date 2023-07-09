export type IError = null | {
    message: string;
};

export type IBookSuggestion = {
    name: string;
    _id: string;
};

export type IBookReference = {
    bookId: string;
    bookName: string;
};

export type IUserDetail = {
    userId: string;
    fineAmount: number;
    numOfBooksIssued: number;
    booksIssued: IBookReference[];
    bookmarks: IBookReference[];
};

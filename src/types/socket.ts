export enum ResponseTypes {
    ERROR = "error",
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    USER_SUGGESTION_LIST = "users_suggestion_list",

    LATEST_ARRIVALS = "latest_arrivals",
    MOST_ISSUED = "most_issued_books",

    BOOK_ADDED = "book_added",
    BOOK_REMOVED = "book_removed",
    BOOK_UPDATED = "book_updated",

    BOOK_ISSUED = "book_issued",
    ISSUE_EXPIRED = "book_issue_period_expired",
    BOOK_RETURNED = "book_returned",

    BOOKMARK_ADDED = "bookmark_added",
    BOOKMARK_REMOVED = "bookmark_removed",
}

export type ISocketResponse = {
    type: ResponseTypes;
    response: any;
    message?: string;
};

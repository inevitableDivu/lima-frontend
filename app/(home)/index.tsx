import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { io } from "socket.io-client";
import LatestArrivals from "../../src/components/latest.home";
import SearchBar from "../../src/components/search.home";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";
import { useLogger } from "../../src/context/LogProvider";
import { useDispatch, useSelector } from "../../src/hooks";
import { ResponseTypes } from "../../src/types/socket";
import {
    addNewBookArrival,
    bookReturned,
    setLatestArrival,
    setMostIssued,
    updateBook,
    updateBookIssue,
} from "../../src/utils/reducer/book.reducer";
import {
    setSocketConnected,
    setSocketInstance,
} from "../../src/utils/reducer/socket.reducer";

export default function Index() {
    const { logger } = useLogger();
    const {
        books: { latestArrival, mostIssued },
        socket: { isConnected },
    } = useSelector((state) => state);

    console.log(latestArrival);

    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        const connectSocket = async () => {
            try {
                if (!isAuthenticated) {
                    dispatch(setSocketInstance(null));
                    dispatch(setSocketConnected(false));
                    return;
                }

                logger.info(
                    ["(home)", "RootLayout.tsx", "Home"],
                    "initializing websocket connection...",
                    "connection state: CONNECTING"
                );
                const socket_client = await io(
                    "https://lima-backend.onrender.com",
                    {
                        query: {
                            _id: user?.uid ?? "uuid",
                            name: user?.displayName ?? "User",
                            photoURL: user?.photoURL ?? "URL",
                        },
                        transports: ["websocket"],
                        timeout: 5000,
                    }
                );

                socket_client.on("connect", () => {
                    dispatch(setSocketInstance(socket_client));
                    socket_client.emit("latestBooks");
                    socket_client.emit("popularBooks");
                });
                socket_client.on("successResponse", (data: any) => {
                    if (data.type === ResponseTypes.CONNECTED) {
                        dispatch(setSocketConnected(true));
                        logger.info(
                            ["(home)", "RootLayout.tsx", "Home"],
                            "websocket connection state: CONNECTED"
                        );
                        logger.info(
                            ["(home)", "RootLayout.tsx", "Home", "WebSocket"],
                            "emiting events to fetch latest and most popular books..."
                        );
                    }
                    if (data.type === ResponseTypes.LATEST_ARRIVALS)
                        dispatch(setLatestArrival(data.response));
                    if (data.type === ResponseTypes.MOST_ISSUED)
                        dispatch(setMostIssued(data.response));
                    if (data.type === ResponseTypes.BOOK_ADDED)
                        dispatch(addNewBookArrival(data.response));
                    if (data.type === ResponseTypes.BOOK_UPDATED) {
                        dispatch(updateBook(data.response));
                        logger.info(
                            ["(home)", "RootLayout.tsx", "Home", "WebSocket"],
                            "updating book..."
                        );
                    }
                    if (data.type === ResponseTypes.BOOK_ISSUED) {
                        logger.info(
                            ["(home)", "RootLayout.tsx", "Home", "WebSocket"],
                            "book issued successfully",
                            {
                                bookId: data.response._id,
                                dueDate: new Date(
                                    data.response.dueDate
                                ).toDateString(),
                            }
                        );
                        dispatch(updateBookIssue(data.response));
                    }
                    if (data.type === ResponseTypes.BOOK_RETURNED) {
                        dispatch(bookReturned(data.response));
                        logger.info(
                            ["(home)", "RootLayout.tsx", "Home", "WebSocket"],
                            "book returned successfully",
                            {
                                fineAmount: data.response.fineAmount,
                                bookId: data.response.book._id,
                            }
                        );
                    }
                });
                socket_client.on("errorInfo", (response: any) => {
                    ToastAndroid.show(response.message, 2000);
                    logger.error(
                        [
                            "(home)",
                            "RootLayout.tsx",
                            "Home",
                            "WebSocket",
                            "Error",
                        ],
                        response
                    );
                });
                socket_client.on("error", (error) =>
                    logger.error(
                        [
                            "(home)",
                            "RootLayout.tsx",
                            "Home",
                            "WebSocket",
                            "Error",
                        ],
                        error
                    )
                );
                socket_client.on("disconnect", (reason) =>
                    logger.info(
                        ["(home)", "RootLayout.tsx", "Home", "WebSocket"],
                        "websocket connection state: - DISCONNECTED",
                        reason
                    )
                );
            } catch (error: any) {
                ToastAndroid.show(
                    error.message ?? "Something went wrong!",
                    2000
                );
            }
        };

        if (user?.uid && isAuthenticated) connectSocket();
    }, [user?.uid, isAuthenticated]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: COLOR.white,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 80,
                }}
            >
                <View
                    style={{
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }}
                >
                    <Text size={18}>
                        <Text
                            size={18}
                            color={`${COLOR.black}55`}
                            fontFamily="Poppins_600SemiBold"
                        >
                            Welcome back
                            {user?.displayName
                                ? ", " + user.displayName.split(" ")[0] + "!"
                                : "!"}{" "}
                        </Text>
                        👋
                    </Text>
                    <Pressable
                        onPress={() => router.push("/profile")}
                        style={{
                            borderRadius: 50,
                            height: 40,
                            aspectRatio: 1,
                            backgroundColor: "grey",
                            overflow: "hidden",
                            elevation: 10,
                        }}
                    >
                        <Image
                            source={
                                user?.photoURL ??
                                require("../../assets/dummy-avatar.jpg")
                            }
                            placeholder={
                                "|OOp.8kC~qoft6ofWBofof_3fQRjj[M{fQRjfQfQj[fQIUayt7fQxuj[j@-;fQM{fQj[fQfQfQWBt7fQRjfQayfQj[fQofRjfQj[fQxuj[WBfQWBt7fQWBfQoffQWBfQayj[fQoffQWBfQoffQofRjfQt7fQj[fQWBfQj["
                            }
                            style={{ height: "100%", width: "100%" }}
                        />
                    </Pressable>
                </View>

                <View
                    style={{
                        rowGap: 12,
                        paddingHorizontal: 24,
                        marginBottom: 24,
                    }}
                >
                    <Text fontFamily="Poppins_600SemiBold" size={28}>
                        What do you want to read today?
                    </Text>
                    <SearchBar />
                </View>

                <LatestArrivals loading={!isConnected} books={latestArrival} />
                <LatestArrivals
                    loading={!isConnected}
                    books={mostIssued}
                    title="Most Issued Books"
                />

                <View
                    style={[
                        {
                            height: 500,
                            justifyContent: "center",
                            paddingHorizontal: 24,
                        },
                    ]}
                >
                    <View>
                        <Text
                            size={80}
                            fontFamily="Poppins_700Bold"
                            color={`${COLOR.black}60`}
                            style={{ lineHeight: 96 }}
                        >
                            Read
                        </Text>
                        <Text
                            size={80}
                            fontFamily="Poppins_700Bold"
                            color={`${COLOR.black}60`}
                            style={{ lineHeight: 96 }}
                        >
                            it up!
                        </Text>
                    </View>
                    <Text
                        fontFamily="Poppins_600SemiBold"
                        style={{ marginTop: 16 }}
                    >
                        Crafted with{" "}
                        <FontAwesome name="heart" size={20} color={COLOR.red} />{" "}
                        in Greater Noida, India
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

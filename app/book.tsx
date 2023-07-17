import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../src/components/button.component";
import Text from "../src/components/text.component";
import { COLOR } from "../src/constants";
import { useDispatch, useSelector } from "../src/hooks";
import {
    addBookInBookmark,
    removeBookmark,
} from "../src/utils/reducer/book.reducer";

export default function BookDetail() {
    const router = useRouter();
    const {
        auth: { user },
        books: { currentBook, bookmarks },
        socket: { socket },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [showFull, setShowFull] = useState(false);

    const isBookMarked = useMemo(() => {
        return bookmarks.find((book) => book._id === currentBook?._id);
    }, [bookmarks, currentBook]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: 10,
                backgroundColor: COLOR.white,
            }}
        >
            <View style={{ flex: 1, position: "relative" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 12,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 5,
                    }}
                >
                    <Pressable
                        onPress={router.back}
                        style={{
                            padding: 16,
                            backgroundColor: COLOR.lightGray,
                            borderRadius: 100,
                        }}
                    >
                        <AntDesign name="arrowleft" size={20} color="black" />
                    </Pressable>
                    <Pressable
                        style={{ padding: 16 }}
                        onPress={() => {
                            if (currentBook) {
                                if (!isBookMarked)
                                    dispatch(addBookInBookmark(currentBook));
                                else dispatch(removeBookmark(currentBook));
                            }
                        }}
                    >
                        <FontAwesome
                            name={isBookMarked ? "bookmark" : "bookmark-o"}
                            size={24}
                            color={isBookMarked ? COLOR.purple : COLOR.black}
                        />
                    </Pressable>
                </View>

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        position: "relative",
                        flexGrow: 1,
                    }}
                >
                    <View
                        style={{
                            marginTop: 80,
                            flex: 0.5,
                            minHeight: 300,
                            // flexDirection: "row",
                        }}
                    >
                        <Image
                            source={currentBook?.cover}
                            placeholder={currentBook?.blurHash}
                            contentFit="contain"
                            transition={1000}
                            style={{
                                height: "100%",
                                borderRadius: 16,
                                overflow: "hidden",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        />
                    </View>

                    <View style={{ padding: 24, gap: 16 }}>
                        <Text fontFamily="Poppins_700Bold" size={20}>
                            {currentBook?.name ?? "Book name"}
                        </Text>
                        {currentBook?.dueDate ? (
                            <Text>
                                Due Date:{" "}
                                <Text fontFamily="Poppins_600SemiBold">
                                    {new Date(
                                        currentBook?.dueDate ?? ""
                                    ).toDateString()}
                                </Text>
                            </Text>
                        ) : null}
                        <Text
                            size={12}
                            fontFamily="Poppins_500Medium"
                            style={{ textDecorationLine: "underline" }}
                        >
                            By:{" "}
                            <Text fontFamily="Poppins_600SemiBold">
                                {currentBook?.author}
                            </Text>
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 16,
                            }}
                        >
                            {currentBook?.numOfPages ? (
                                <Text size={12} fontFamily="Poppins_500Medium">
                                    Number of Pages:{" "}
                                    <Text fontFamily="Poppins_600SemiBold">
                                        {currentBook.numOfPages}
                                    </Text>
                                </Text>
                            ) : null}
                            {currentBook?.publishedYear ? (
                                <Text size={12} fontFamily="Poppins_500Medium">
                                    Published:{" "}
                                    <Text fontFamily="Poppins_600SemiBold">
                                        {currentBook.publishedYear}
                                    </Text>
                                </Text>
                            ) : null}
                        </View>
                        {showFull ? (
                            <View>
                                {currentBook?.description
                                    ?.split("\\n")
                                    .map((description, index) => {
                                        return (
                                            <View key={index}>
                                                <Text
                                                    size={14}
                                                    fontFamily="Poppins_500Medium"
                                                    color={`${COLOR.black}80`}
                                                    style={{}}
                                                >
                                                    {description ??
                                                        "Book description"}
                                                </Text>
                                            </View>
                                        );
                                    })}
                            </View>
                        ) : (
                            <View>
                                <Text
                                    size={14}
                                    fontFamily="Poppins_500Medium"
                                    color={`${COLOR.black}80`}
                                    numberOfLines={3}
                                >
                                    {currentBook?.description}{" "}
                                </Text>
                                <Text
                                    fontFamily="Poppins_600SemiBold"
                                    size={14}
                                    color={`${COLOR.black}dd`}
                                    onPress={() => setShowFull(!showFull)}
                                >
                                    Read More
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 24,
                    paddingTop: 10,
                    marginBottom: 20,
                    backgroundColor: COLOR.white,
                    borderTopColor: COLOR.lightGray,
                    borderTopWidth: 2,
                    gap: 20,
                }}
            >
                {currentBook?.isAvailable ? (
                    <>
                        <Button
                            style={{ alignSelf: "auto", flex: 1 }}
                            outlined
                            onPress={() => {
                                if (!isBookMarked)
                                    dispatch(addBookInBookmark(currentBook));
                                else dispatch(removeBookmark(currentBook));
                            }}
                        >
                            {isBookMarked ? "Remove" : "Bookmark"}
                        </Button>
                        <Button
                            loading={loading}
                            disabled={loading}
                            style={{ alignSelf: "auto", flex: 1 }}
                            onPress={() => {
                                try {
                                    setLoading(true);
                                    if (!socket)
                                        throw new Error(
                                            "Server is not responding!"
                                        );
                                    socket?.emit(
                                        "issueBook",
                                        { bookId: currentBook?._id },
                                        (status: any) => {
                                            if (status.status === "ok")
                                                router.push("/modal/success");
                                            setLoading(false);
                                        }
                                    );
                                } catch (error: any) {
                                    ToastAndroid.show(error.message, 2000);
                                    setLoading(false);
                                }
                            }}
                        >
                            Issue Now
                        </Button>
                    </>
                ) : currentBook?.borrower === user?.uid ? (
                    <>
                        <Button
                            loading={loading}
                            disabled={loading}
                            style={{ alignSelf: "auto", flex: 1 }}
                            onPress={() => {
                                setLoading(true);
                                socket?.emit(
                                    "returnBook",
                                    {
                                        bookId: currentBook?._id,
                                    },
                                    ({
                                        status,
                                        fineAmount,
                                    }: {
                                        status: "ok" | "error";
                                        fineAmount: number;
                                    }) => {
                                        if (status === "ok") {
                                            router.push({
                                                pathname: "/modal/return",
                                                params: {
                                                    fineAmount,
                                                },
                                            });
                                        }
                                        setLoading(false);
                                    }
                                );
                            }}
                        >
                            Return Book
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            disabled
                            style={{ alignSelf: "auto", flex: 1, opacity: 0.7 }}
                        >
                            Currently unavailable
                        </Button>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

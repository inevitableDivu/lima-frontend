import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { COLOR } from "../constants";
import { useDispatch } from "../hooks";
import { IBook } from "../types/reducer";
import { setCurrentBook } from "../utils/reducer/book.reducer";
import Text from "./text.component";

const __noOfCardPerView = 2.5;
const __aspectRatio = 1.3;
const __cardWidth = Dimensions.get("screen").width / __noOfCardPerView;
const __cardHeight = __cardWidth * __aspectRatio;

export default function BookCard(props: IBook) {
    const router = useRouter();
    const dispatch = useDispatch();

    const { author, name, cover, blurHash, isAvailable } = props;

    return (
        <Pressable
            style={[styles.container]}
            onPress={() => {
                dispatch(setCurrentBook(props));
                router.push({
                    pathname: "/book",
                });
            }}
        >
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    height: __cardHeight * 0.7,
                    width: __cardHeight * 0.75 * 0.7,
                    alignSelf: "center",
                    borderRadius: 8,
                    overflow: "hidden",
                    zIndex: 1,
                    elevation: 6,
                }}
            >
                <Image
                    source={cover}
                    style={{ height: "100%", width: "100%" }}
                    placeholder={blurHash}
                    contentFit="cover"
                    transition={1000}
                />
            </View>
            <View style={[styles.innerContainer]}>
                {isAvailable ? null : (
                    <View style={[styles.issuedContent]}>
                        <FontAwesome5
                            name="exclamation-circle"
                            size={20}
                            color={COLOR.red}
                        />
                    </View>
                )}
                <View
                    style={{
                        flex: 0.6,
                        padding: 10,
                        justifyContent: "flex-end",
                    }}
                >
                    <Text
                        numberOfLines={1}
                        size={14}
                        fontFamily="Poppins_600SemiBold"
                    >
                        {name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        size={12}
                        fontFamily="Poppins_500Medium"
                        color={`${COLOR.black}78`}
                    >
                        By: {author}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: __cardWidth,
        height: __cardHeight,
        position: "relative",
        justifyContent: "flex-end",
    },
    innerContainer: {
        borderRadius: 20,
        height: __cardHeight * 0.7,
        justifyContent: "flex-end",
        backgroundColor: COLOR.lightGray,
        position: "relative",
    },
    issuedContent: {
        position: "absolute",
        top: -6,
        left: -6,
    },
});

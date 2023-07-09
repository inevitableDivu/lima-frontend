import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { COLOR } from "../constants";
import { IBook } from "../types/reducer";
import BookCard from "./card.book";
import Text from "./text.component";

type IBookType = {
    author: string;
    genre: string;
    id: string;
    title: string;
};

export default function LatestArrivals({
    books,
    loading = true,
    title = "Latest Arrival",
    onPress = () => {},
}: {
    books: IBook[];
    loading: boolean;
    title?: string;
    onPress?(): void;
}) {
    return (
        <View style={{ marginVertical: 24 }}>
            <View
                style={{
                    paddingHorizontal: 24,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text size={18} fontFamily="Poppins_500Medium">
                    {title}
                </Text>
                <Text
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                    onPress={onPress}
                >
                    <Text
                        fontFamily="Poppins_500Medium"
                        size={12}
                        color={`${COLOR.black}78`}
                    >
                        Show All{" "}
                    </Text>
                    <AntDesign
                        name="arrowright"
                        size={14}
                        color={`${COLOR.black}78`}
                        style={{ marginLeft: 10 }}
                    />
                </Text>
            </View>
            {loading ? (
                <ActivityIndicator
                    color={COLOR.purple}
                    size="large"
                    style={{ marginTop: 48 }}
                />
            ) : (
                <FlatList
                    horizontal
                    snapToStart
                    data={books}
                    keyExtractor={(item) => `${item._id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 16,
                        paddingHorizontal: 24,
                        paddingVertical: 24,
                        overflow: "visible",
                    }}
                    renderItem={({ item: book }) => {
                        return <BookCard {...book} />;
                    }}
                />
            )}
        </View>
    );
}

import React, { useCallback } from "react";
import type { ListRenderItem } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/header.component";
import { COLOR, FONT, LAYOUT } from "../../src/constants";
import { useLogger } from "../../src/context/LogProvider";

type Unarray<T> = T extends Array<infer U> ? U : T;

export default function Debug() {
    const { logs } = useLogger();

    const renderItem: ListRenderItem<Unarray<typeof logs>> = useCallback(
        ({ item, index }) => {
            return (
                <View
                    style={{
                        marginVertical: 10,
                        marginBottom: index + 1 === logs.length ? 40 : 16,
                    }}
                >
                    <Text style={styles.logTime}>
                        {new Date(item.timeStamp).toISOString()}
                    </Text>
                    <Text style={{ marginTop: 4 }}>
                        <Text
                            style={[
                                styles.logType,
                                {
                                    color:
                                        item.type === "INFO"
                                            ? "#16a34a"
                                            : item.type === "WARN"
                                            ? COLOR.yellow
                                            : COLOR.red,
                                },
                            ]}
                        >
                            [{item.type}]
                        </Text>
                        &nbsp;
                        <Text style={[styles.logTarget]}>
                            {item.target}
                        </Text>:{" "}
                        <Text style={styles.logMessage}>{item.message}</Text>
                    </Text>
                </View>
            );
        },
        []
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
            <Header title="Debug Application" />
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLOR.white,
                }}
            >
                <FlatList
                    data={logs}
                    style={{
                        backgroundColor: COLOR.lightGray,
                        flex: 1,
                    }}
                    contentContainerStyle={{
                        padding: 20,
                    }}
                    keyExtractor={(item, index) =>
                        `${item.type}-${item.timeStamp}-${index}`
                    }
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imagecontainer: {
        padding: 18,
        width: LAYOUT.width,
        maxWidth: 400,
        aspectRatio: 1,
    },
    WARN: {
        color: COLOR.yellow,
    },
    INFO: {
        color: COLOR.green,
    },
    ERROR: {
        color: COLOR.red,
    },
    logType: {
        fontFamily: FONT.Poppins_700Bold,
        fontSize: 14,
    },
    logMessage: {
        color: COLOR.text,
        fontFamily: FONT.Poppins_500Medium,
        fontSize: 14,
    },
    logTime: {
        color: COLOR.neutral,
        fontFamily: FONT.Poppins_400Regular,
        fontSize: 12,
    },
    logTarget: {
        color: COLOR.purple,
        fontStyle: "italic",
        fontFamily: FONT.Poppins_400Regular,
        fontSize: 12,
    },
});

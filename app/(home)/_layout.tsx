import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { COLOR } from "../../src/constants";
import { useLogger } from "../../src/context/LogProvider";
import { useSelector } from "../../src/hooks";

export default function HomeLayout() {
    const { logger } = useLogger();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        logger.info(
            ["(home)", "RootLayout.tsx"],
            "logged in with phone number:- " + user?.phoneNumber
        );
    }, []);
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: "absolute",
                        height: 80,
                        borderRadius: 20,
                        elevation: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon(props) {
                            return (
                                <Ionicons
                                    name={
                                        props.focused ? "home" : "home-outline"
                                    }
                                    size={props.size * 0.9}
                                    color={
                                        props.focused
                                            ? COLOR.purple
                                            : `${COLOR.black}66`
                                    }
                                />
                            );
                        },
                    }}
                />
                <Tabs.Screen
                    name="issued"
                    options={{
                        tabBarIcon(props) {
                            return (
                                <FontAwesome
                                    name={"book"}
                                    size={props.size * 0.9}
                                    color={
                                        props.focused
                                            ? COLOR.purple
                                            : `${COLOR.black}66`
                                    }
                                />
                            );
                        },
                    }}
                />
                <Tabs.Screen
                    name="bookmarks"
                    options={{
                        tabBarIcon(props) {
                            return (
                                <FontAwesome
                                    name={
                                        props.focused
                                            ? "bookmark"
                                            : "bookmark-o"
                                    }
                                    size={props.size * 0.9}
                                    color={
                                        props.focused
                                            ? COLOR.purple
                                            : `${COLOR.black}66`
                                    }
                                />
                            );
                        },
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon(props) {
                            return (
                                <FontAwesome
                                    name={
                                        props.focused
                                            ? "user-circle"
                                            : "user-circle-o"
                                    }
                                    size={props.size * 0.9}
                                    color={
                                        props.focused
                                            ? COLOR.purple
                                            : `${COLOR.black}66`
                                    }
                                />
                            );
                        },
                    }}
                />
            </Tabs>
        </>
    );
}

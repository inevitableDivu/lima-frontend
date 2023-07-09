import { useFonts } from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { FONT_LIST } from "../src/constants";
import AuthProvider from "../src/context/AuthProvider";
import LogProvider from "../src/context/LogProvider";
import CustomProvider from "../src/context/Provider";
import SocketProvider from "../src/context/SocketProvider";
import { persistStore, store } from "../src/utils/store";

preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded] = useFonts(FONT_LIST);

    useEffect(() => {
        if (fontsLoaded) hideAsync();
    }, [fontsLoaded]);

    return (
        <Provider store={store}>
            <PersistGate persistor={persistStore}>
                <LogProvider>
                    <CustomProvider>
                        {fontsLoaded ? (
                            <AuthProvider>
                                <SocketProvider>
                                    <Stack
                                        initialRouteName="/"
                                        screenOptions={{
                                            headerShown: false,
                                            gestureEnabled: true,
                                            gestureDirection: "horizontal",
                                        }}
                                    >
                                        <Stack.Screen
                                            name="book"
                                            options={{
                                                headerShown: false,
                                                animation: "fade_from_bottom",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="search"
                                            options={{
                                                headerShown: false,
                                                animation: "fade_from_bottom",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="modal/success"
                                            options={{
                                                headerShown: false,
                                                animation: "fade",
                                                presentation:
                                                    "transparentModal",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="modal/return"
                                            options={{
                                                headerShown: false,
                                                animation: "fade",
                                                presentation:
                                                    "transparentModal",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="modal/permission"
                                            options={{
                                                headerShown: false,
                                                animation: "fade",
                                                presentation:
                                                    "transparentModal",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="profile/name"
                                            options={{
                                                headerShown: false,
                                                animation: "slide_from_right",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="profile/team"
                                            options={{
                                                headerShown: false,
                                                animation: "fade",
                                                presentation:
                                                    "transparentModal",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="profile/support"
                                            options={{
                                                headerShown: false,
                                                animation: "fade",
                                                presentation:
                                                    "transparentModal",
                                            }}
                                        />
                                        <Stack.Screen
                                            name="profile/debug"
                                            options={{
                                                headerShown: false,
                                                animation: "slide_from_right",
                                            }}
                                        />
                                    </Stack>
                                </SocketProvider>
                            </AuthProvider>
                        ) : null}
                    </CustomProvider>
                </LogProvider>
            </PersistGate>
        </Provider>
    );
}

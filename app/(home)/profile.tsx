import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    ToastAndroid,
    TouchableHighlight,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../../src/components/text.component";
import { COLOR, LAYOUT } from "../../src/constants";
import { useDispatch, useSelector } from "../../src/hooks";
import { useUpload } from "../../src/hooks/useUpload";
import { setLoadingState, setUser } from "../../src/utils/reducer/auth.reducer";
import { clearBookmarks } from "../../src/utils/reducer/book.reducer";
import { setSocketInstance } from "../../src/utils/reducer/socket.reducer";

const __height = LAYOUT.width / 3;

const buttonList = [
    {
        name: "Edit Name",
        href: "/profile/name",
        key: "profile-name",
    },
    {
        name: "Debug Application",
        href: "/profile/debug",
        key: "profile-debug",
    },
    {
        name: "Team",
        href: "/profile/team",
        key: "profile-team",
    },
    {
        name: "Support",
        href: "/profile/support",
        key: "profile-support",
    },
];

export default function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    const [uploading, setUploading] = useState(false);

    const [uploadImageToFirebase] = useUpload();

    const handleLogout = useCallback(() => {
        dispatch(setSocketInstance(null));
        dispatch(clearBookmarks());
        dispatch(setLoadingState(true));
        auth().signOut();
    }, []);

    const handleImageUpload = useCallback(async () => {
        try {
            const requestPermission =
                await ImagePicker.getMediaLibraryPermissionsAsync();
            if (!requestPermission.granted) {
                const permission =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (permission.status === ImagePicker.PermissionStatus.DENIED)
                    return router.push({
                        pathname: "/modal/permission",
                        params: { type: "PERMISSION" },
                    });
            }

            setUploading(true);
            const response = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });

            if (response.canceled) throw new Error("Upload Canceled!");

            const uri = await uploadImageToFirebase(response.assets[0]);

            await auth().currentUser?.updateProfile({
                photoURL: uri,
            });

            if (!uri)
                throw new Error("Cannot update profile! Please try again.");

            dispatch(setUser(user ? { ...user, photoURL: uri } : null));
            await Image.prefetch(uri);
            setUploading(false);
        } catch (error: any) {
            setUploading(false);
            ToastAndroid.show(error.message ?? "Something went wrong!", 2000);
            console.log(error.message);
        }
    }, [user]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: 48 }}
                contentContainerStyle={{
                    padding: 24,
                    paddingBottom: 80,
                    paddingTop: 0,
                    flexGrow: 1,
                    gap: 30,
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <Pressable
                        onPress={handleImageUpload}
                        style={{
                            position: "relative",
                            height: __height + 10,
                            aspectRatio: 1,
                            borderRadius: __height + 10,
                            padding: 6,
                            borderWidth: 4,
                            borderColor: COLOR.purple,
                            backgroundColor: COLOR.white,
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
                            style={{
                                height: "100%",
                                width: "100%",
                                borderRadius: __height,
                            }}
                        />
                        <Ionicons
                            style={{
                                position: "absolute",
                                bottom: 4,
                                right: 4,
                                backgroundColor: COLOR.white,
                                borderRadius: 24,
                                padding: 4,
                                zIndex: 2,
                            }}
                            name="camera-reverse"
                            size={18}
                            color="black"
                        />

                        <AnimatePresence>
                            {uploading ? (
                                <MotiView
                                    from={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: "absolute",
                                        top: 6,
                                        left: 6,
                                        right: 6,
                                        bottom: 6,
                                        backgroundColor: `${COLOR.black}66`,
                                        borderRadius: __height,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ActivityIndicator
                                        color={COLOR.white}
                                        size={36}
                                    />
                                </MotiView>
                            ) : null}
                        </AnimatePresence>
                    </Pressable>
                    <View
                        style={{
                            marginTop: 24,
                            maxWidth: "90%",
                            alignSelf: "center",
                        }}
                    >
                        <Text
                            fontFamily="Poppins_700Bold"
                            size={28}
                            numberOfLines={1}
                            style={{ maxWidth: "90%" }}
                        >
                            {user?.displayName ?? user?.phoneNumber}
                        </Text>
                        {user?.displayName && (
                            <Text
                                fontFamily="Poppins_600SemiBold"
                                color={`${COLOR.black}99`}
                                centered
                                numberOfLines={1}
                                style={{ maxWidth: "90%" }}
                            >
                                {user?.phoneNumber}
                            </Text>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginBottom: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <ButtonList />
                    <View>
                        <Pressable
                            onPress={handleLogout}
                            style={[styles.logoutButton]}
                        >
                            <MaterialIcons
                                name="logout"
                                size={20}
                                color="black"
                            />
                            <Text size={18} fontFamily="Poppins_600SemiBold">
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const ButtonList = React.memo(() => {
    const router = useRouter();

    return (
        <View style={{ gap: 10 }}>
            {buttonList.map((item) => {
                return (
                    <TouchableHighlight
                        underlayColor={COLOR.lightGray}
                        key={item.key}
                        style={[styles.itemButton]}
                        onPress={() => {
                            router.push(item.href);
                        }}
                    >
                        <Text size={14} fontFamily="Poppins_600SemiBold">
                            {item.name}
                        </Text>
                    </TouchableHighlight>
                );
            })}
        </View>
    );
});

const styles = StyleSheet.create({
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: `${COLOR.lightGray}`,
        padding: 12,
        borderRadius: 16,
    },
    itemButton: {
        backgroundColor: `${COLOR.lightGray}70`,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
});

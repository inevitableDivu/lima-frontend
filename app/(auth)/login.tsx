import BottomSheet, {
    BottomSheetBackdropProps,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import AnimatedLottieView from "lottie-react-native";
import React, { useMemo, useRef, useState } from "react";
import { Image, StyleSheet, ToastAndroid, View } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../src/components/button.component";
import TextInput from "../../src/components/input.component";
import Text from "../../src/components/text.component";
import { useDispatch } from "../../src/hooks";
import { useInput } from "../../src/hooks/useInput";
import { setLoadingState, setUser } from "../../src/utils/reducer/auth.reducer";

export default function Login() {
    const bottomSheetRef = useRef<BottomSheet | null>(null);
    const bottomSheetModalRef = useRef<BottomSheet | null>(null);
    const dispatch = useDispatch();

    const [confirmation, setConfirmation] =
        useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

    const {
        form,
        handleChange,
        loading,
        disabled,
        handleOnSubmit,
        reInitialize,
    } = useInput({
        phoneNumber: { type: "number", limit: 10 },
    });

    const otp = useInput({
        otp: { type: "number", limit: 6 },
    });

    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    padding: 24,
                    rowGap: 24,
                    backgroundColor: "white",
                }}
            >
                <View style={[style.imageContainer]}>
                    <AnimatedLottieView
                        source={require("../../assets/27315-appointment-booking-with-smartphone.json")}
                        autoPlay
                        style={{ height: "100%", width: "100%" }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                        paddingBottom: 24,
                    }}
                >
                    <View style={{ rowGap: 20 }}>
                        <Text
                            centered
                            size={24}
                            fontFamily="Poppins_600SemiBold"
                        >
                            Read your favourite books
                        </Text>
                        <Text
                            centered
                            fontFamily="Poppins_500Medium"
                            style={{
                                maxWidth: 300,
                                alignSelf: "center",
                                opacity: 0.5,
                                lineHeight: 24,
                            }}
                        >
                            Get your favourite books issued from library at your
                            finger tips. Track records of your issued and
                            returned book with issue expiring reminders. Also
                            pay your fines at your ease.
                        </Text>
                    </View>
                    <Button
                        onPress={async () => {
                            bottomSheetRef.current?.expand();
                        }}
                    >
                        Get Started
                    </Button>
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={["50%", 500]}
                    index={-1}
                    enablePanDownToClose
                    enableContentPanningGesture={false}
                    backdropComponent={CustomBackdrop}
                    containerStyle={{ zIndex: 10 }}
                    onClose={reInitialize}
                >
                    <BottomSheetScrollView
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            flexGrow: 1,
                            rowGap: 32,
                            justifyContent: "space-between",
                            paddingBottom: 24,
                        }}
                    >
                        <View>
                            <Text
                                size={14}
                                fontFamily="Poppins_600SemiBold"
                                style={{ opacity: 0.4 }}
                            >
                                Account Sign In
                            </Text>
                            <Text size={24} fontFamily="Poppins_600SemiBold">
                                Hey, Welcome to our virtual library!
                            </Text>
                            <View style={{ rowGap: 24, marginTop: 16 }}>
                                <TextInput
                                    value={form.phoneNumber.value}
                                    onChangeText={handleChange("phoneNumber")}
                                    error={form.phoneNumber.error}
                                    placeholder="Enter your phone number here"
                                    label={"Phone number"}
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    onBlur={() =>
                                        handleChange("phoneNumber")(
                                            form.phoneNumber.value
                                        )
                                    }
                                />
                            </View>
                        </View>
                        <View>
                            <Button
                                loading={loading}
                                disabled={disabled}
                                style={{ alignSelf: "auto" }}
                                onPress={handleOnSubmit(
                                    async (data) => {
                                        const confirmation =
                                            await auth().signInWithPhoneNumber(
                                                "+91" + data.phoneNumber.value
                                            );
                                        setConfirmation(confirmation);

                                        bottomSheetRef.current?.close();
                                        bottomSheetModalRef.current?.expand();
                                    },
                                    (error) =>
                                        error
                                            ? ToastAndroid.show(
                                                  error?.message,
                                                  2000
                                              )
                                            : null
                                )}
                            >
                                Continue
                            </Button>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
                <BottomSheet
                    ref={bottomSheetModalRef}
                    enablePanDownToClose
                    enableContentPanningGesture={false}
                    snapPoints={["50%", 500]}
                    index={-1}
                    backdropComponent={CustomBackdrop}
                    containerStyle={{ zIndex: 10 }}
                    onClose={otp.reInitialize}
                >
                    <BottomSheetScrollView
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingVertical: 10,
                            flexGrow: 1,
                            rowGap: 32,
                            justifyContent: "space-between",
                            paddingBottom: 24,
                        }}
                    >
                        <View>
                            <Text
                                size={14}
                                fontFamily="Poppins_600SemiBold"
                                style={{ opacity: 0.4 }}
                            >
                                Account Sign In
                            </Text>
                            <Text size={24} fontFamily="Poppins_600SemiBold">
                                Let's verify your phone number first
                            </Text>
                            <View style={{ rowGap: 24 }}>
                                <TextInput
                                    placeholder="Enter your otp here"
                                    label="One time password"
                                    cursorColor={"black"}
                                    value={otp.form.otp.value}
                                    error={otp.form.otp.error}
                                    onChangeText={otp.handleChange("otp")}
                                    keyboardType="number-pad"
                                    onBlur={() => {
                                        otp.handleChange("otp")(
                                            otp.form.otp.value
                                        );
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <Button
                                {...otp}
                                onPress={otp.handleOnSubmit(
                                    async (data) => {
                                        const {
                                            user = null,
                                            additionalUserInfo = null,
                                        } =
                                            (await confirmation?.confirm(
                                                data.otp.value
                                            )) ?? {};

                                        const response = user
                                            ? {
                                                  displayName: user.displayName,
                                                  email: user.email,
                                                  emailVerified:
                                                      user.emailVerified,
                                                  isAnonymous: user.isAnonymous,
                                                  metadata: user.metadata,
                                                  phoneNumber: user.phoneNumber,
                                                  photoURL: user.photoURL,
                                                  providerData:
                                                      user.providerData,
                                                  providerId: user.providerId,
                                                  uid: user.uid,
                                                  isNewUser: Boolean(
                                                      additionalUserInfo?.isNewUser
                                                  ),
                                              }
                                            : null;
                                        console.log(user);
                                        dispatch(setLoadingState(true));
                                        dispatch(setUser(response));
                                    },
                                    (error) =>
                                        ToastAndroid.show(
                                            error?.message ??
                                                "Something Went Wrong!",
                                            2000
                                        )
                                )}
                                style={{ alignSelf: "auto" }}
                            >
                                Submit
                            </Button>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </>
    );
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 0.5],
            Extrapolate.CLAMP
        ),
        zIndex: interpolate(
            animatedIndex.value,
            [-1, 0],
            [-1, 2],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#000",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle} />;
};

const style = StyleSheet.create({
    image: {
        height: "100%",
        width: "100%",
        aspectRatio: 1,
        maxWidth: 500,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 48,
    },
    button: {
        backgroundColor: "#D45555",
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 14,
        alignSelf: "center",
    },
});

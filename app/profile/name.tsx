import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../src/components/button.component";
import Header from "../../src/components/header.component";
import TextInput from "../../src/components/input.component";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";
import { useDispatch, useSelector } from "../../src/hooks";
import { useInput } from "../../src/hooks/useInput";
import { setUser } from "../../src/utils/reducer/auth.reducer";

export default function name() {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const router = useRouter();

    const { form, handleChange, handleOnSubmit, loading, disabled } = useInput({
        name: {
            type: "text",
            value: user?.displayName ?? "",
        },
    });
    return (
        <SafeAreaView style={{ backgroundColor: COLOR.white, flex: 1 }}>
            <Header title="Let's change your name" />
            <View
                style={{
                    paddingHorizontal: 24,
                    paddingBottom: 24,
                    justifyContent: "space-between",
                    flex: 1,
                }}
            >
                <TextInput
                    value={form.name.value}
                    error={form.name.error}
                    onChangeText={handleChange("name")}
                    placeholder="Enter your name here"
                />

                <Button
                    style={{ alignSelf: "auto" }}
                    loading={loading}
                    disabled={disabled}
                    onPress={handleOnSubmit(
                        async (data) => {
                            await auth().currentUser?.updateProfile({
                                displayName: data.name.value.trim(),
                            });

                            dispatch(
                                setUser(
                                    user
                                        ? {
                                              ...user,
                                              displayName:
                                                  data.name.value.trim(),
                                          }
                                        : null
                                )
                            );

                            router.back();
                        },
                        (error) =>
                            ToastAndroid.show(
                                error?.message ?? "Something went wrong",
                                2000
                            )
                    )}
                >
                    Update
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

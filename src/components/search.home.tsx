import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { COLOR } from "../constants";
import { useInput } from "../hooks/useInput";
import Button from "./button.component";
import TextInput from "./input.component";

export default function SearchBar() {
    const router = useRouter();

    const { form, handleChange, handleOnSubmit } = useInput({
        search: {
            type: "text",
            value: "",
        },
    });

    return (
        <View
            style={{
                flexDirection: "row",
                columnGap: 16,
                alignItems: "center",
            }}
        >
            <TextInput
                value={form.search.value}
                error={form.search.error}
                onChangeText={handleChange("search")}
                containerStyle={{ flex: 1 }}
                placeholder="Search books..."
            />
            <Button
                onPress={handleOnSubmit((data) =>
                    router.push({
                        pathname: "/search",
                        params: {
                            search: data.search.value,
                        },
                    })
                )}
                style={{
                    alignSelf: "auto",
                    paddingHorizontal: 0,
                    aspectRatio: 1,
                }}
            >
                <Feather name="search" size={24} color={COLOR.white} />
            </Button>
        </View>
    );
}

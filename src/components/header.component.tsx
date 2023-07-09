import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { COLOR } from "../constants";
import Text from "./text.component";

export default function Header({ title = "" }: { title: string }) {
    const router = useRouter();

    return (
        <View
            style={{
                paddingHorizontal: 24,
                paddingVertical: 10,
                gap: 16,
            }}
        >
            <Pressable
                onPress={router.back}
                style={{
                    padding: 16,
                    backgroundColor: COLOR.lightGray,
                    borderRadius: 100,
                    alignSelf: "flex-start",
                }}
            >
                <AntDesign name="arrowleft" size={20} color="black" />
            </Pressable>
            <Text
                size={24}
                color={COLOR.purple}
                fontFamily="Poppins_600SemiBold"
            >
                {title}
            </Text>
        </View>
    );
}

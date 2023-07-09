import { Entypo, FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { openURL } from "expo-linking";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../src/components/text.component";
import { COLOR } from "../../src/constants";
import { Unarray } from "../../src/types/reducer";

const teamList = [
    {
        key: "divyansh",
        name: "Divyansh Pandey",
        image: require("../../assets/team/divyansh-2023061401028.jpg"),
        linkedin: "https://www.linkedin.com/in/divyansh-pandey-8b0981181/",
        instagram: "https://www.instagram.com/divu_inevitable_0_o/",
        title: "Software Developer",
    },
    {
        key: "soniya",
        name: "Soniya Bhati",
        image: require("../../assets/team/soniya-20230613234425.jpg"),
        linkedin: "https://www.linkedin.com/in/soniya-bhati-7b748a259/",
        instagram: "https://www.instagram.com/_soniya_425/",
        title: "Backend Developer",
    },
    {
        key: "ankush",
        name: "Ankush Katiyar",
        image: require("../../assets/team/ankush-2023061312315.jpg"),
        linkedin: "https://www.linkedin.com/in/ankush-katiyar-68ba25232/",
        instagram: "https://www.instagram.com/_ankush_1405/",
        title: "Frontend Developer",
    },
    {
        key: "divyam",
        name: "Divyam Sharma",
        image: require("../../assets/team/divyam-20230613235725.jpg"),
        linkedin:
            "https://www.linkedin.com/in/divyam-krishna-sharma-b34218248/",
        instagram: "https://www.instagram.com/divyam___29/",
        title: "Backend Developer",
    },
    {
        key: "aadarsh",
        name: "Aadarsh Singh",
        image: require("../../assets/team/aadarsh-2023061323546.jpg"),
        linkedin: "https://www.linkedin.com/in/aadarsh-singh-60a1a5229/",
        instagram: "https://www.instagram.com/_aadarsh.singh_12_/",
        title: "Frontend Developer",
    },
];

export default function team() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: `${COLOR.black}44` }}>
            <BottomSheet
                snapPoints={["40%", "70%"]}
                enablePanDownToClose
                onClose={router.back}
            >
                <Text
                    size={24}
                    fontFamily="Poppins_700Bold"
                    color={COLOR.text}
                    style={{ marginHorizontal: 24, marginTop: 12 }}
                >
                    The Creators 😊
                </Text>
                <BottomSheetScrollView
                    style={{ marginTop: 16 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 24,
                        paddingTop: 10,
                        paddingBottom: 24,
                        gap: 20,
                    }}
                >
                    {teamList.map((member) => {
                        return <MemberCard {...member} />;
                    })}
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
}

const MemberCard = React.memo((props: Unarray<typeof teamList>) => {
    return (
        <View style={[styles.memberCardContainer]}>
            <View style={[styles.imageContainer]}>
                <Image
                    source={props.image}
                    style={{ height: "100%", width: "100%" }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "space-between",
                }}
            >
                <View>
                    <Text size={20} fontFamily="Poppins_600SemiBold">
                        {props.name}
                    </Text>
                    <Text
                        size={14}
                        fontFamily="Poppins_600SemiBold"
                        color={`${COLOR.black}80`}
                    >
                        {props.title}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 16, marginTop: 10 }}>
                    <Entypo
                        name="instagram"
                        size={20}
                        color={COLOR.black}
                        onPress={() => openURL(props.instagram)}
                    />
                    <FontAwesome
                        name="linkedin-square"
                        size={20}
                        color={COLOR.black}
                        onPress={() => openURL(props.linkedin)}
                    />
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    memberCardContainer: {
        padding: 12,
        borderRadius: 16,
        backgroundColor: COLOR.lightGray,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    imageContainer: {
        height: 96,
        aspectRatio: 1,
        borderRadius: 96,
        overflow: "hidden",
    },
});

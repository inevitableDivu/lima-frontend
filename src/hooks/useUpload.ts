import storage from "@react-native-firebase/storage";
import { ImagePickerAsset } from "expo-image-picker";
import { ToastAndroid } from "react-native";
import { useSelector } from ".";
import { makeid } from "../utils/reducer/auth.reducer";

function useUpload() {
    const { user } = useSelector((state) => state.auth);
    async function uploadImageAsync(file: NonNullable<ImagePickerAsset>) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        try {
            const blob: Blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", file.uri, true);
                xhr.send(null);
            });

            console.log(file.fileName);
            const fileRef = await storage().ref(
                file.fileName ?? `${user?.uid ?? makeid(24)}.png`
            );

            const result = await fileRef.put(blob);
            if (result.error) {
                ToastAndroid.show(result.error.message, 2000);
                return null;
            }

            // We're done with the blob, close and release it
            // @ts-ignore
            blob.close();

            const url = await fileRef.getDownloadURL();

            return url;
        } catch (error: any) {
            console.log(error.message);
            return null;
        }
    }

    return [uploadImageAsync];
}

export { useUpload };

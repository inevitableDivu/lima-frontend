import auth from "@react-native-firebase/auth";
import { useRouter, useSegments } from "expo-router";
import React, { PropsWithChildren, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "../hooks";
import { setLoadingState, setUser } from "../utils/reducer/auth.reducer";

const Provider = createContext({});

export default function AuthProvider({ children }: PropsWithChildren) {
    const dispatch = useDispatch();
    const segments = useSegments();
    const router = useRouter();

    const { isAuthenticated } = useSelector(({ auth }) => auth);

    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";

        if (
            // If the user is not signed in and the initial segment is not anything in the auth group.
            !isAuthenticated &&
            !inAuthGroup
        ) {
            // Redirect to the sign-in page.
            router.replace("/login");
        } else if (isAuthenticated && inAuthGroup) {
            // Redirect away from the sign-in page.
            router.replace("/");
        }
    }, [isAuthenticated, segments]);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await dispatch(setUser(user));
            }
            await Promise.resolve(
                setTimeout(() => dispatch(setLoadingState(false)), 2000)
            );
        });

        async function initialize() {
            const user = await auth().currentUser;
            await dispatch(setUser(user));
        }

        initialize();

        return unsubscribe;
    }, []);

    return <Provider.Provider value={{}}>{children}</Provider.Provider>;
}

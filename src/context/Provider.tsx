import { AnimatePresence, MotiView } from "moti";
import React, {
    PropsWithChildren,
    createContext,
    useCallback,
    useEffect,
    useState,
} from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { COLOR } from "../constants";
import { useDispatch, useSelector } from "../hooks";
import { setLoadingState } from "../utils/reducer/auth.reducer";

const CustomProvider = createContext({});

export default function Provider({ children }: PropsWithChildren) {
    const { isLoading } = useSelector(({ auth }) => auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoadingState(true));
    }, []);

    return (
        <CustomProvider.Provider value={{}}>
            {children}
            <AppLoader isLoading={isLoading} />
        </CustomProvider.Provider>
    );
}

const AppLoader = ({ isLoading = false }: { isLoading: boolean }) => {
    const Loader = useCallback(() => {
        return (
            <MotiView
                from={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: "timing",
                    duration: 350,
                }}
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: COLOR.white,
                    zIndex: 500,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size={48} color={COLOR.purple} />
            </MotiView>
        );
    }, []);
    return (
        <AnimatePresence exitBeforeEnter>
            {isLoading ? <Loader /> : null}
        </AnimatePresence>
    );
};

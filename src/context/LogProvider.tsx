import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSelector } from "../hooks";

type ILogLevels = "INFO" | "ERROR" | "WARN";

interface LoggerContextTypes {
    logger: {
        info: ILoggerFunctionType<"INFO">;
        warn: ILoggerFunctionType<"WARN">;
        error: ILoggerFunctionType<"ERROR">;
    };
    logs: {
        type: ILogLevels;
        message: string;
        timeStamp: number;
        target: string;
    }[];
}

type ILoggerFunctionType<LogLevel extends ILogLevels> = (
    target: string | string[],
    ...args: any[]
) => void;

const LoggerContext = createContext<LoggerContextTypes>({
    logger: {
        info: () => {},
        warn: () => {},
        error: () => {},
    },
    logs: [],
});

export function useLogger() {
    return useContext(LoggerContext);
}

export default function LogProvider({ children }: React.PropsWithChildren) {
    const [logs, setLogs] = useState<LoggerContextTypes["logs"]>([]);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const logger: <T extends ILogLevels>(
        type: T,
        target: string | string[],
        logs: any[]
    ) => void = useCallback((type, target, logs) => {
        let message = "";

        for (let i = 0; i < logs.length; ++i) {
            const item = logs[i];

            if (typeof item === "string") {
                message += item;
            } else if (typeof item === "object") {
                message += JSON.stringify(item);
            } else {
                message += String(item);
            }

            if (logs.length > 1 && i + 1 !== logs.length) {
                message += " | ";
            }
        }

        let targetFile =
            "[" +
            (typeof target !== "string"
                ? target
                      .map(
                          (item) => item.charAt(0).toUpperCase() + item.slice(1)
                      )
                      .join("] [")
                : target.charAt(0).toUpperCase() + target.slice(1)) +
            "]";

        setLogs((oldLogs) => [
            {
                type,
                message,
                timeStamp: new Date().getTime(),
                target: targetFile,
            },
            ...oldLogs,
        ]);
    }, []);

    const info: ILoggerFunctionType<"INFO"> = useCallback((target, ...args) => {
        logger("INFO", target, args);
    }, []);

    const warn: ILoggerFunctionType<"WARN"> = useCallback((target, ...args) => {
        logger("WARN", target, args);
    }, []);

    const error: ILoggerFunctionType<"ERROR"> = useCallback(
        (target, ...args) => {
            logger("ERROR", target, args);
        },
        []
    );

    useEffect(() => {
        info("logProvider.tsx", "app initialized...");
        info("logProvider.tsx", "retrieving data from phone cache storage...");
    }, []);

    useEffect(() => {
        if (!isAuthenticated) setLogs([]);
    }, [isAuthenticated]);

    return (
        <LoggerContext.Provider
            value={{
                logger: {
                    info,
                    warn,
                    error,
                },
                logs,
            }}
        >
            {children}
        </LoggerContext.Provider>
    );
}

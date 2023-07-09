import { useCallback, useEffect, useMemo, useState } from "react";
import { IError } from "../types";

export type IUserInputParams = Record<
    string,
    | {
          type: "email" | "text" | "password";
          value?: unknown;
      }
    | {
          type: "number";
          value?: number;
          limit: number;
      }
>;

export type IFormDataTypes = "email" | "text" | "password" | "number";

export type INumberForm = {
    value: string;
    error: IError;
    limit: number;
    type: "number";
};

export type IOtherType<T> = {
    type: "email" | "text" | "password";
    value: T extends unknown ? string : T;
    error: IError;
};

export type IUserInputForm<T extends IUserInputParams> = {
    [P in keyof T]: "number" extends T[P]["type"]
        ? INumberForm
        : IOtherType<T[P]["value"]>;
};

export function validate(value: string, type: "email" | "password"): IError;

export function validate(value: string, type: "email" | "password"): IError {
    if (value.length === 0)
        return {
            message: "Input field cannot be empty",
        };

    if (type === "email") {
        const check = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/g;
        if (check.test(value)) return null;
        else
            return {
                message: "Invalid e-mail entered",
            };
    }

    if (type === "password") {
        if (value.length < 6)
            return {
                message: "Password must contain atleat 6 characters",
            };
        else null;
    }

    return null;
}

export function useInput<T extends IUserInputParams>(params: T) {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const formData = useMemo(() => {
        const obj: T = { ...params };
        let newObj: object = {};
        Object.keys(obj).map((key) => {
            let index = key as keyof T;
            let objChild = obj[index];
            newObj = {
                ...(newObj ?? ({} as IUserInputForm<T>)),
                [index]: {
                    ...obj[index],
                    value:
                        objChild.type === "number" ? "" : objChild.value ?? "",
                    type: objChild.type,
                },
            };
        });

        return newObj as IUserInputForm<T>;
    }, []);
    const [form, setForm] = useState<IUserInputForm<T>>(formData);

    const handleChange = useCallback(
        <P extends keyof T>(target: P) => {
            const formTarget = form[target];
            const type = formTarget.type;

            return (text: string | number) => {
                let error: IError = null;
                if (type === "email" || type === "password") {
                    error = validate(String(text), type);
                }

                if (type === "text") {
                    error =
                        String(text).length < 1
                            ? { message: "Input field cannot be empty!" }
                            : null;
                }

                if (type === "number") {
                    if (text === "") {
                        error = {
                            message: "Input field cannot be empty!",
                        };
                    } else if (isNaN(Number(text))) {
                        error = {
                            message: "Invalid character provided!",
                        };
                    } else if (String(text).length > formTarget.limit) {
                        error = {
                            message: "Invalid length of characters!",
                        };
                    }
                }

                setForm((data) => ({
                    ...data,
                    [target]: { ...data[target], value: text, error },
                }));

                return error;
            };
        },
        [form]
    );

    const handleOnSubmit = useCallback(
        (
            cb: (data: IUserInputForm<T>) => void,
            errorCallback?: (error: IError) => void,
            complete?: () => void
        ) => {
            return async () => {
                try {
                    setLoading(true);
                    const error = Object.keys(form).find((item) =>
                        Boolean(form[item as keyof T].error)
                    ) as keyof T;

                    const errorIndex = Object.keys(form).find(
                        (item) => String(form[item as keyof T].value).length < 1
                    );

                    if (error) {
                        console.log(error);
                        return;
                    }

                    if (errorIndex) {
                        setForm((old) => ({
                            ...old,
                            [errorIndex]: {
                                ...old[errorIndex],
                                error: {
                                    message: "Input field cannot be empty!",
                                },
                            },
                        }));
                        return;
                    }

                    await cb(form);
                } catch (error: any) {
                    const message =
                        typeof error?.response?.data === "string"
                            ? error.response.data
                            : typeof error?.response?.data === "object"
                            ? error.response.data.message
                            : error.message;
                    errorCallback?.({
                        message,
                    });
                } finally {
                    complete?.();
                    setLoading(false);
                }
            };
        },
        [form]
    );

    const reInitialize = useCallback(() => {
        setForm(formData);
    }, [formData]);

    useEffect(() => {
        const check = Object.keys(form).find((item) => {
            return Boolean(form[item as keyof T].error);
        });

        if (check) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [form]);

    return {
        handleChange,
        form,
        handleOnSubmit,
        loading,
        disabled,
        reInitialize,
    };
}

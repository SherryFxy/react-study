import { useDebugValue, useEffect, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value
export const cleanObject = (object?: {[key: string]: unknown}) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        const value = result[key];
        if(isFalsy(value)){
            delete result[key];
        }
    })
    return result;
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(timeout);
    }, [value, delay])
    return debounceValue;
}

export const useArray = <T>(initArray: T[]) => {
    const [value, setValue] = useState(initArray);
    return {
        value,
        setValue,
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        },
        add: (item: T) => setValue([...value, item])
    }
}
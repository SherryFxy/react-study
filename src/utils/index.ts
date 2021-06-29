import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isViod = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object?: {[key: string]: unknown}) => {
    const result = {...object};
    Object.keys(result).forEach(key => {
        const value = result[key];
        if(isViod(value)){
            delete result[key];
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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

export const useDocumentTitle = (title: string, keepOnUnMount: boolean = true) => {
    // useRef 返回一个可变的ref对象，其 .current 属性被初始化为传入放入参数(initialValue)。
    // 返回的ref 对象在组件的整个生命周期内保持不变
    const oldTitle = useRef(document.title).current;

    useEffect(() => {
        document.title = title;
    }, [title])

    useEffect(() => {
        return () => {
            if (!keepOnUnMount) {
                document.title = oldTitle
            }
        }
    }, [keepOnUnMount, oldTitle])
}

export const resetRoute = () => window.location.href = window.location.origin

/**
 * 返回组件的挂在状态，如果还没挂在或者已经卸载，返回false，否则返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false
        }
    })
    return mountedRef
}

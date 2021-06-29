import { useCallback, useState } from "react"
import { useMountedRef } from "utils";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig};
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const mountedRef = useMountedRef()
    // 惰性初始state：initialState参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
    // 如果初试state需要通过复杂计算获得，则可传入一个函数，
    // 在函数中计算并返回初始的state，此函数只在初始渲染时被调用
    const [retry, setRetry] = useState(() => () => {})

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])

    const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
        if (!promise || !promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        });
        setState(prevState => ({ ...prevState, stat: 'loading' }));
        return promise.then((data: D) => {
            if (mountedRef.current)
            setData(data);
            return data
        }).catch(error => {
            console.log('error', error, error.message);
            // catch 会消化异常，如果不主动抛出异常，外面是接收不到异常的
            setError(error)
            if (config.throwOnError) return Promise.reject(error);
            // return error
        })
    }, [config.throwOnError, mountedRef, setData, setError])

    // const retry = () => {
    //     run();
    // }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry 被调用时，重新跑一遍run，让state刷新一遍
        retry,
        ...state
    }
}
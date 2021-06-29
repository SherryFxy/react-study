import { useMemo } from "react"
import { useSearchParams, URLSearchParamsInit } from "react-router-dom"
import { cleanObject } from "utils"

/**
 * 返回页面中url中，指定键的参数
 * @param keys 
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    // 基本类型，组件状态，都可以放在依赖里；非组建状态对象，绝不可以放到依赖里
    // useMemo优化组件，只有在searchParams改变的时候，才执行useMemo里面的函数，防止无限渲染
    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || ''}
            }, {} as {[key in K]: string}),
            [searchParams]
        ),
        (params: Partial<{[key in K]: unknown}>) => {
            // Object.entries 是将对象转换成自身可枚举
            // Object.fromEntries(iterable) 将键值对列表 转换成 一个对象
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
            return setSearchParam(o);
        }
    ] as const
}
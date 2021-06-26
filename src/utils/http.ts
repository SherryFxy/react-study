import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string,
    data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为2XX的时候抛出异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
            .then(async response => {
                if (response.status === 401) {
                    await auth.logout()
                    window.location.reload();
                    return Promise.reject({message: '请重新登录'});
                }
                const data = response.json()
                if (response.ok) {
                    return data
                } else {
                    // 由于fetch在非2xx的时候不抛出异常，加上catch也捕捉不到，
                    // 所以要在response不为OK的时候，手动抛出异常
                    return Promise.reject(data)
                }
            })
}

// JS 中的typeof，是在 runtime 时运行的
// TS 中的typeof，是在静态环境运行的，TS 最后都会被编译成 JS 运行，编译后不会保留任何类型
export const useHttp = () => {
    const {user} = useAuth();
    // unility type 的用法：用泛型给它传入一个其他类型，然后unility type 对这个类型进行某种操作
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token});
}

// 联合类型
let myFavouriteNumber: string | number
myFavouriteNumber = 9;
myFavouriteNumber = 'jack'
// 类型别名
type FavouriteNumber = string | number
let jackFavouriteNumber: FavouriteNumber = '6'

// 类型别名 在很多情况下可以和 interface 互换
// interface Person {
//     name: string
// }
// type Person = {name: string}
// const xiaoming: Person = {name: 'xiaoming'}

// 类型别名，interface 在这种情况(联合类型)下没法替代type
// interface 也没法实现 utility type
type Person = {
    name: string,
    age: number
}
const xiaoming: Partial<Person> = {name: 'xiaoming'} // 可以没有名字或者年龄，可以为空
const shenmiren: Omit<Person, 'name'> = {age: 8} // age必须有
const shenmiren1: Omit<Person, 'name' | 'age'> = {} // age必须有


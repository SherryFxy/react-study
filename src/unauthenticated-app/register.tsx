import { useAuth } from "context/auth-context"
// import { FormEvent } from "react";
import {Form, Input, Button} from 'antd';

export const RegisterScreen = ({onError}: {onError: (error: Error) => void}) => {
    const {register} = useAuth()
    const handleSubmit = async ({ cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        // event.preventDefault();
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        if (cpassword !== values.password) {
            onError(new Error('请确认两次密码相同'))
            return
        }
        try {
            await register(values)
        } catch (e) {
            onError(e)
        }
    }

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}
        >
            <Input placeholder={'用户名'} type="text" id={"username"} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}
        >
            <Input placeholder={'密码'} type="password" id={"password"} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{required: true, message: '请确认密码'}]}
        >
            <Input placeholder={'密码'} type="password" id={"cpassword"} />
        </Form.Item>
        <Form.Item>
            <Button htmlType={'submit'} type={'primary'}>注册</Button>
        </Form.Item>
    </Form>
}
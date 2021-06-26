import { useAuth } from "context/auth-context"
// import { FormEvent } from "react";
import {Form, Input, Button} from 'antd';

export const RegisterScreen = () => {
    const {register, user} = useAuth()
    const handleSubmit = (values: {username: string, password: string}) => {
        // event.preventDefault();
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        register(values)
    }

    return <Form onFinish={handleSubmit}>
        <Form.Item>
            <Input placeholder={'用户名'} type="text" id={"username"} />
        </Form.Item>
        <Form.Item>
            <Input placeholder={'密码'} type="password" id={"password"} />
        </Form.Item>
        <Form.Item>
            <Button htmlType={'submit'} type={'primary'}>注册</Button>
        </Form.Item>
    </Form>
}
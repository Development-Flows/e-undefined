"use client"
import {Form, Input, Button} from 'antd';
import {useRouter} from 'next/navigation';
import {userLoginHandler} from "@/store/user";
import {useSelector, useDispatch} from "react-redux";

export default function Login() {
    const {push} = useRouter()
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.user)
    const onFinish = (values) => {
        //store.dispatch(userLoginHandler(values.email,values.password))
        const loginData = {mail: values.email, password: values.password}
        dispatch(userLoginHandler(loginData)).then(({payload}) => {
            if (payload.status === true) push("/admin/panel")
        })
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <Form
                name="login"
                initialValues={{remember: true}}
                onFinish={onFinish}
                style={{width: 400, padding: 24, border: '1px solid #ccc', borderRadius: 8}}
            >
                <h1 style={{textAlign: 'center'}}>Admin Giriş</h1>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" style={{width: '100%'}}>
                        Giriş Yap
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
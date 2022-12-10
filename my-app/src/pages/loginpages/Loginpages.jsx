import React from 'react';
import { Alert, Button, Card, Checkbox, Form, Input } from 'antd';
import './loginpages.css'
import { CONFIG } from '../../service/untils';
import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/usecontext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


   
const Loginpages = () => {
    const[error,setError]=useState('');
    const authcontext=useContext(AuthContext);
    const navigate=useNavigate();


    const onFinish = async (values) => {
        try {
            const API_URL=`${CONFIG.API_URL}/auth/login`;
            const data =await axios.post(API_URL,{
                email:values.username,
                password:values.password
               
            })
            authcontext.setUser(data.data.body.data.user);
            localStorage.setItem('user',JSON.stringify(data.data.body.data));
            navigate('/dashboard')
        } catch (e) {
            console.log(e,'error');
            setError(e.response.data.body.message);
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return <div className='login-pages'>

        <Card style={{ width: 500  }}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                    {
                        error && <Alert message={error} type="errrrrr"/>
                    }
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </Card>



    </div>

};
export default Loginpages;
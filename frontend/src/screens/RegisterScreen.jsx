import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import Loader from "../components/Loader";
import { useRegisterMutation } from "../sclices/userApi";
import { setCredentials } from '../sclices/AuthSclice'


import React from 'react'

function RegisterScreen() {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate('/')
            }
            catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }


    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>





                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {isLoading ?? <Loader />}

                <Button type='submit' variant="primary" className="mt-3">
                    Sign UP
                </Button>

                <Row className="py-3">
                    <Col>
                        Already have account ? <Link to="/log In">Log IN</Link>
                    </Col>
                </Row>

            </Form>

        </FormContainer>
    )
}

export default RegisterScreen
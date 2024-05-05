import React, { useState } from "react";
import { Form, FormField, Input, Icon, Button } from 'semantic-ui-react'

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import './ForgotPassword.css'

export default function ForgotPassword() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Header />
            <div className="container-password">
                <div className="background-password">
                    <div className="content-password">
                        <h1>Esqueceu a sua senha?</h1>
                        <p>Não se preocupe! Insira o seu e-mail de cadastro e enviaremos um código para você.</p>
                        <div className="form-content-recover">
                            <Form size="large" style={{width: '300px'}}>
                                <FormField>
                                    <label>E-mail</label>
                                    <Input
                                        iconPosition="left"
                                        placeholder="Email"
                                        type="email"
                                        style={{margin: '0', width: '100%'}}
                                    >
                                        <Icon name="at" />
                                        <input/>
                                    </Input>
                                </FormField>
                            </Form>
                            <Button
                                color="orange"
                                circular
                                size="medium"
                                style={{ color: "black", marginTop: "5%", width: "50%" }}
                                onClick={toggleIsOpen}
                            >
                                Enviar
                            </Button>
                        </div>
                        <div 
                            className="recieve-code"
                            style={{display: isOpen ? "flex" : "none"}}
                            >
                            <Form size="large">
                                <FormField>
                                    <Input
                                        iconPosition="left"
                                        placeholder="Insira o código"
                                        type="text"
                                        style={{margin: '0'}}
                                    >
                                        <Icon name="archive" />
                                        <input/>
                                    </Input>
                                </FormField>
                            </Form>
                            <Button
                                color="orange"
                                circular
                                size="tiny"
                                style={{ color: "black", marginTop: "5%"}}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
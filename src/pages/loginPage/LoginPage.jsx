import React, { useState } from "react";
import { Form, Input, FormField, Icon, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import './LoginPage.css'

export default function LoginPage() {

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    function salvar() {}

    return (
        <div>
            <Header />
            <div className="container-login">
                <div className="background-login">
                    <div className="content-login">
                        <h1>Acesse a sua Conta</h1>
                        <div className="form-content-login">
                            <Form widths="equal" size="large">
                                <FormField>
                                    <label>E-mail</label>
                                    <Input
                                        iconPosition="left"
                                        placeholder='Email'
                                        type="email"
                                        style={{margin: '0'}}
                                    >
                                        <Icon name="at"/>
                                        <input 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </Input>
                                </FormField>
                                <FormField>
                                    <label>Senha</label>
                                    <Input
                                        iconPosition="left"
                                        placeholder='Senha'
                                        type="password"
                                        style={{margin: '0'}}
                                    >
                                        <Icon name="lock"/>
                                        <input 
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                        />
                                    </Input>
                                </FormField>
            
                            </Form>
                            <Button
                                color="orange"
                                circular
                                size="medium"
                                style={{color: 'black', marginTop: '5%'}}
                                onClick={salvar()}
                            >Entrar</Button>
                        </div>
                        <div className="haveAcount">
                            <p>Não tem uma conta?</p>
                            <Link to={'/register-page'}>Cadastre-se</Link>
                        </div>
                        <span className="forgotPassword">Esqueceu sua senha?</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
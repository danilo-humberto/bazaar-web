import React from "react";
import { Form, FormGroup, FormInput, Container, Button } from "semantic-ui-react"
import InputMask from "react-input-mask";

export default function FormContent() {
    return(
        <div style={{marginTop: '25%'}}>
            <Container textAlign="center">
                <h1>Crie a Sua Conta</h1>
                <div style={{marginTop: '5%'}}>
                    <Form>
                        <FormGroup widths='equal'>
                            <FormInput 
                                required
                                fluid
                                label='Nome Completo'
                                placeholder='nome completo'
                            />
                            <FormInput 
                                required
                                fluid
                                label='Email'
                                placeholder='email'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormInput 
                                required
                                fluid
                                label='Senha'
                                placeholder='senha'
                            />
                            <FormInput 
                                required
                                fluid
                                label='Confirmar Senha'
                                placeholder='confirmar senha'
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormInput 
                                required
                                fluid
                                label='Telefone'>
                                <InputMask 
                                    mask="(99) 99999-9999"
                                />
                            </FormInput>
                            <FormInput 
                                required
                                fluid
                                label='CPF'>
                                <InputMask 
                                    mask="999.999.999-99"
                                />
                            </FormInput>
                        </FormGroup>
                    </Form>
                </div>

                <Button color="orange" circular size="large" style={{color: 'black'}}>Cadastrar</Button>
            </Container>
        </div>
    )
}
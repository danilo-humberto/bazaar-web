import axios from "axios";
import React, { useState } from "react";
import { Form, FormGroup, FormInput, Container, Button } from "semantic-ui-react"
import InputMask from "react-input-mask";

export default function FormContent() {

    const [nomeCompleto, setNomeCompleto] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [cpf, setCpf] = useState();
    const [numeroTelefone, setNumeroTelefone] = useState();

    function salvar() {

		let usuarioRequest = {
            nomeCompleto: nomeCompleto,
		     email: email,
		     senha: senha,
		     cpf: cpf,
		     numeroTelefone: numeroTelefone
		}
	
		axios.post("http://localhost:8080/api/usuario", usuarioRequest)
		.then((response) => {
		     console.log('Usuario cadastrado com sucesso.')
		})
		.catch((error) => {
		     console.log('Erro ao incluir o um Usuario.')
		})
	}



    return (
        <div style={{ marginTop: '25%' }}>
            <Container textAlign="center">
                <h1>Crie a Sua Conta</h1>
                <div style={{ marginTop: '5%' }}>
                    <Form>
                        <FormGroup widths='equal'>
                            <FormInput
                                required
                                fluid
                                label='Nome Completo'
                                placeholder='nome completo'
                                value={nomeCompleto}
                                onchange={e => setNomeCompleto(e.target.value)}
                            />
                            <FormInput
                                required
                                fluid
                                label='Email'
                                placeholder='email'
                                value={email}
                                onchange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup widths='equal'>
                            <FormInput
                                required
                                fluid
                                label='Senha'
                                placeholder='senha'
                                value={senha}
                                onchange={e => setSenha(e.target.value)}
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
                                    value={numeroTelefone}
                                    onchange={e => setNumeroTelefone(e.target.value)}
                                />
                            </FormInput>
                            <FormInput
                                required
                                fluid
                                label='CPF'>
                                <InputMask
                                    mask="999.999.999-99"
                                    value={cpf}
                                    onchange={e => setCpf(e.target.value)}
                                />
                            </FormInput>
                        </FormGroup>
                    </Form>
                </div>

                <Button color="orange" circular size="large" style={{ color: 'black' }} onClick={() => salvar()} 
                >Cadastrar</Button>
            </Container>
        </div>
    )
}
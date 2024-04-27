import axios from "axios";
import React, { useState } from "react";
import { Form, FormInput, Container, Button } from "semantic-ui-react"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import './accActivation.css'


export default function AccActivation() {

    const [verificador, setVerificador] = useState();

    function salvar() {


        axios.get(`http://localhost:8080/api/usuario/verificarCadastro/${verificador}` )
        .then((response) => {
            toast.success("Código confirmado com sucesso!",{
                position: "top-right",
                autoClose: 3000,
            })
        })
        .catch((error) => {
            toast.error("Código Inválido!", {
                position: "top-right",
                autoClose: 3000,
            })
        })
        setVerificador("")
    }

    return (
        <div>
            <Header />
            <div className="content-form">
                <Container textAlign="center">
                    <h2>Código de Confirmação!</h2>
                    <div className="teste">
                        <Form size="big" style={{marginBottom: "1%"}}>
                            <FormInput
                                required
                                fluid
                                placeholder='Insira o código'
                                value={verificador}
                                onChange={e => setVerificador(e.target.value)}
                                className="input"
                            />
                        </Form>
                    </div>

                    <Button 
                    color="orange" 
                    circular 
                    size="large" 
                    style={{ color: 'black' }} 
                    onClick={() => salvar()} 
                    >Confirmar Código</Button>
            </Container>
            </div>
            <Footer />
        </div>
    )
}
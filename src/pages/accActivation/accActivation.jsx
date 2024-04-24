import axios from "axios";
import React, { useState } from "react";
import { Form, FormGroup, FormInput, Container, Button } from "semantic-ui-react"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import './accActivation.css'


export default function AccActivation() {

    const [codigoConfirmacao, setCodigoConfirmacao] = useState();

    function salvar() {

        let usuarioRequest = {
            codigoConfirmacao: codigoConfirmacao,
        }

        axios.post("http://localhost:8080/api/usuario", usuarioRequest)
        .then((response) => {
            toast.warning("Código confirmado com sucesso!",{
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
    }

    return (
        <div>
            <Header />
        <div className="content-form">
            <Container textAlign="center">
                <h2>Digite abaixo o código que enviamos por email</h2>
                <div className="container-form">
                    <Form>
                        <FormGroup widths='equal'>
                            <FormInput
                                required
                                width= {6}
                                placeholder='Insira o código'
                                value={codigoConfirmacao}
                                onChange={e => setCodigoConfirmacao(e.target.value)}
                            />
                        </FormGroup>
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
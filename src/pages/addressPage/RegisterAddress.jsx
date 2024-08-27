import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import InputMask from "react-input-mask";
import axios from "axios";
import { notifyError, notifySuccess } from "../../views/util/Util";

export default function RegisterAddress({ onCloseModal }) {

  const [estado, setEstado] = useState();
  const [cidade, setCidade] = useState();
  const [bairro, setBairro] = useState();
  const [rua, setRua] = useState();
  const [cep, setCep] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();

  const salvar = async () => {
    const idUser = localStorage.getItem("userId")

    let enderecoRequest = {
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      cep: cep,
      numero: numero,
      complemento: complemento
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`http://localhost:8080/api/endereco/${idUser}`, enderecoRequest, {headers: {Authorization: `Bearer ${token}`}});
  
      if(response.status === 201) {
        notifySuccess("Endereço Cadastrado com Sucesso!")
        console.log(response)
        onCloseModal();
      } else {
        notifyError("Erro ao cadastrar endereço!")
        console.log(enderecoRequest, idUser)
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição", error)
      notifyError("Erro ao fazer a requisição", error)
    }
  }

  return (
    <div>
      <Container textAlign="justified" style={{padding: '20px 30px'}}>
        <h2 style={{color: 'black', textAlign: 'center'}}>Registrar Endereço</h2>

        <Divider />

        <div style={{ marginTop: "3%", width: '100%', backgroundColor: 'white' }}>
            <Form onSubmit={salvar}>
                <Form.Group>
                    <Form.Input 
                        required
                        fluid
                        label="Estado"
                        width={6}
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                    />

                    <Form.Input 
                      required
                      fluid
                      label="Cidade"
                      width={6}
                      value={cidade}
                      onChange={e => setCidade(e.target.value)}
                    />

                    <Form.Input 
                      required
                      fluid
                      label="Bairro"
                      width={6}
                      value={bairro}
                      onChange={e => setBairro(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                  <Form.Input 
                    required
                    fluid
                    label="Rua"
                    width={10}
                    value={rua}
                    onChange={e => setRua(e.target.value)}
                  />

                  <Form.Input
                    required
                    fluid
                    label="CEP"
                    width={4}
                  >
                    <InputMask 
                      required
                      mask="99999-999"
                      value={cep}
                      onChange={e => setCep(e.target.value)}
                    />
                  </Form.Input>

                  <Form.Input 
                    required
                    fluid
                    label="Número"
                    width={2}
                    value={numero}
                    onChange={e => setNumero(e.target.value)}
                  />
                </Form.Group>

                <Form.Input 
                  required
                  fluid
                  label="Complemento"
                  value={complemento}
                  onChange={e => setComplemento(e.target.value)}
                />
            </Form>

            <div style={{marginTop: '2%', display: 'flex', justifyContent: 'space-between'}}>
              <Button 
                type="button"
                circular
                icon
                labelPosition="left"
                color="red"
                onClick={onCloseModal}
              >
                <Icon name="reply"/>
                Cancelar
              </Button>

              <Button 
                type="submit"
                circular
                icon
                labelPosition="right"
                color="green"
                onClick={salvar}
              >
                <Icon name="save"/>
                Adicionar
              </Button>
            </div>
        </div>
      </Container>
    </div>
  );
}

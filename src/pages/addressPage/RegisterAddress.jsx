import React from "react";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import InputMask from "react-input-mask";

export default function RegisterAddress({ onCloseModal }) {
  return (
    <div>
      <Container textAlign="justified" style={{padding: '20px 30px'}}>
        <h2 style={{color: 'black', textAlign: 'center'}}>Registrar Endereço</h2>

        <Divider />

        <div style={{ marginTop: "3%", width: '100%' }}>
            <Form>
                <Form.Group>
                    <Form.Input 
                        required
                        fluid
                        label="Estado"
                        width={6}
                    />

                    <Form.Input 
                      required
                      fluid
                      label="Cidade"
                      width={6}
                    />

                    <Form.Input 
                      required
                      fluid
                      label="Bairro"
                      width={6}
                    />
                </Form.Group>

                <Form.Group>
                  <Form.Input 
                    required
                    fluid
                    label="Rua"
                    width={10}
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
                    />
                  </Form.Input>

                  <Form.Input 
                    required
                    fluid
                    label="Número"
                    width={2}
                  />
                </Form.Group>

                <Form.Input 
                  required
                  fluid
                  label="Complemento"
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
                type="button"
                circular
                icon
                labelPosition="right"
                color="green"
                onClick={onCloseModal}
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

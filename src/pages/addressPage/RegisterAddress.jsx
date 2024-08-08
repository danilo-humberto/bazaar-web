import React from "react";
import { Container, Divider, Form } from "semantic-ui-react";

export default function RegisterAddress() {
  return (
    <div>
      <Container textAlign="justified">
        <h2>Registrar Endereço</h2>

        <Divider />

        <div style={{ marginTop: "4%" }}>
            <Form>
                <Form.Group>
                    <Form.Input 
                        required
                        fluid
                        label=""
                    />
                </Form.Group>
            </Form>
        </div>
      </Container>
    </div>
  );
}

import React from 'react'
import ReactInputMask from 'react-input-mask'
import { Form } from 'semantic-ui-react'

import './DebitCard.css'

const DebitCard = () => {
  return (
    <div className='debit-card-container'>
      <h2>Insira as informações que constam no cartão de débito</h2>
      <div className="form-debit-card">
        <Form>
            <Form.Input 
                required
                fluid
                placeholder='Número do Cartão'
                label='Número do Cartão'
            />

            <Form.Input 
                required
                fluid
                placeholder='Nome no Cartão'
                label='Nome no Cartão'
            />

            <Form.Group widths='equal'>
                <Form.Input 
                    required
                    fluid
                    label='Validade'
                >
                    <ReactInputMask
                        mask='99/9999'
                    />
                </Form.Input>

                <Form.Input 
                    required
                    fluid
                    placeholder='CVC'
                    label='CVC'
                />
            </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default DebitCard

import React from 'react'

import ReactInputMask from 'react-input-mask'
import { Form } from 'semantic-ui-react'
import './CreditCard.css'

const CreditCard = () => {
  return (
    <div className='credit-card-container'>
      <h2>Insira as informações que constam no cartão de crédito</h2>
      <div className="form-credit-card">
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

                <Form.Input 
                    required
                    fluid
                    placeholder='Parcelas'
                    label='Parcelas'
                />
            </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default CreditCard

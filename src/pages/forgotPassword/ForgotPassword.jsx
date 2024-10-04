import React, { useState} from "react";
import {useNavigate} from "react-router-dom"
import { Form, FormField, Input, Icon, Button, Loader } from "semantic-ui-react";
import { notifyWarn } from "../../views/util/Util";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import "./ForgotPassword.css";
import axios from "axios";


export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function redefinir() {
    let emailRequest = {email:email}

    setLoading(true);
    axios.post("http://localhost:8080/api/usuario/redefinir-senha",emailRequest)
    .then((Response)=>{
      setLoading(false);
      notifyWarn("Confirme sua alteração de senha no e-mail!");
      navigate("/login")
    }) 
  }
  return (
    <div>
      <Header />
      <div className="container-password">
        <div className="background-password">
          <div className="content-password">
            <h1>Esqueceu a sua senha?</h1>
            <p>Não se preocupe! Insira o seu e-mail de cadastro e enviaremos um código para você.</p>
            <div className="form-content-recover">
              <Form size="large" style={{ width: "300px" }}>
                <FormField>
                  <label>E-mail</label>
                  <Input iconPosition="left" placeholder="Email" type="email" style={{ margin: "0", width: "100%" }}
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  >
                    <Icon name="at" />
                    <input />
                  </Input>
                </FormField>
              </Form>
              <Button  
                color="orange" 
                circular size="medium" 
                style={{ color: "black", marginTop: "5%", width: "50%" }} 
                onClick={redefinir}
                >
                  {loading ? (
                    <Loader active inline inverted size="tiny" />
                  ) : (
                    <span style={{ color: "black" }}>Enviar</span>
                  )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

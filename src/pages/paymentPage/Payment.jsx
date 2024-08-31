import React, { useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/otherFooter/otherFooter";
import { FaArrowRightLong } from "react-icons/fa6";
import "./Payment.css";
import CreditCard from "./creditCard/CreditCard";
import Resume from "./resume/Resume";
import DebitCard from "./debitCard/DebitCard";
import Pix from "./pix/Pix";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  return (
    <div>
      <Header />
      <div className="background-payment">
        <div className="container-payment">
          <div className="content-payment">
            <div className="pay-forms">
              <div className="content-pay-forms">
                <h2 style={{ marginBottom: "30px" }}>
                  Escolha a forma de pagamento:
                </h2>
                <div className="methods-payment">
                  <p>Pix</p>
                  <button onClick={() => setSelectedPaymentMethod("pix")}>
                    <FaArrowRightLong />
                  </button>
                </div>
                <div className="methods-payment">
                  <p>Cartão de Crédito</p>
                  <button
                    onClick={() => setSelectedPaymentMethod("creditCard")}
                  >
                    <FaArrowRightLong />
                  </button>
                </div>
                <div className="methods-payment">
                  <p>Cartão de Débito</p>
                  <button onClick={() => setSelectedPaymentMethod("debitCard")}>
                    <FaArrowRightLong />
                  </button>
                </div>

                {selectedPaymentMethod === 'pix' && (
                  <div className="pix">
                    <Pix />
                  </div>
                )}

                {selectedPaymentMethod === 'creditCard' && (
                  <div className="creditCard">
                    <CreditCard />
                  </div>
                )}

                {selectedPaymentMethod === 'debitCard' && (
                  <div className="debitCard">
                    <DebitCard />
                  </div>
                )}
                
              </div>
              <p className="enjoy-paragraph">
                Obrigado por escolher nosso Bazaar!
              </p>
            </div>
            <div className="resume-payment">
              <Resume />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
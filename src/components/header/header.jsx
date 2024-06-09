import React from "react";
import { Input, Button, Icon } from 'semantic-ui-react';
import './header.css';
import LogoLaranja from '../../assets/logo-laranja.png';
import 'semantic-ui-css/semantic.min.css';


export default function Header() {
    return (
        <div className="background">
            <img src={LogoLaranja} alt="logo laranja do bazaar" />
            <Input
            className= 'input'
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Digite aqui para pesquisar...'
            />
            <Icon link name= 'bell' size="big" className="notification"/>
            <Icon link name= 'shopping basket' size="big" className="shopping-basket"/>
            <Button color="white" circular size="large" edge="orange">Entrar</Button>
        </div>
        
    )
}
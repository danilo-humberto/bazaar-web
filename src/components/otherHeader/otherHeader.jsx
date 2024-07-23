import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'
import { FaBell, FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import LogoLaranja from '../../assets/logo-laranja.png'

import "./otherHeader.css"

export default function OtherHeader () {

    const [isLogged, setIsLogged] = useState(false);

    return (
        <div className='new-background'>
            <div>
                <img src={LogoLaranja} alt="logo do bazaar" width={170} height={170}/>
                <Input type='text' icon="search" placeholder="Digite aqui para pesquisar..." style={{margin: '0', width: '350px', height: '50%'}}/>
            </div>

            <div>
                <FaBell className='bell'/>
                <FaShoppingBag className='shop'/>
                {isLogged ? (
                    <CgProfile className='profile'/>
                ) : (
                    <button className='btn-login'>Entrar</button>
                )}
            </div>
        </div>
    )
}
import React from "react"

import './header.css'
import LogoLaranja from '../../assets/logo-laranja.png'

export default function Header() {
    return (
        <div className="background">
            <img src={LogoLaranja} alt="logo laranja do bazaar" />
        </div>
    )
}
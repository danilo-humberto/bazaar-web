import React from "react"
import { Link } from "react-router-dom"

import './header.css'
import LogoLaranja from '../../assets/logo-laranja.png'

export default function Header() {

    return (
        <div className="background">
            <Link to={'/'}><img src={LogoLaranja} alt="logo laranja do bazaar" /></Link>
        </div>
    )
}
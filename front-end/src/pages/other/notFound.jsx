import React from 'react';
import { Link } from 'react-router-dom';

import './style.css'

export default function NotFound() {
    

    return (
    <>
        <div className="foundBody">
            <div id="container">
                <div className="content">                   
                    <h2>403</h2>
                    <h4>Ooopps!!! Failed to authenticate token</h4>
                    <p>Não existe um token válido para esta seção. Por favor faça login novamente, através do link abaixo</p>
                    <Link to="/login">Pagina de Login</Link>
                </div>
            </div>
        </div>
    </>
    )
}
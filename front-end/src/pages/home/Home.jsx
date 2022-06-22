import React, { useContext }  from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import Logo from '../../assets/Logo.jpeg'

import Sidebar from './components/Sidebar.jsx';



export default function Home(props) {
    const auth = useContext(AuthContext);    

    

    return (
        <div className="container">
            <header>
               <h2>{props.title}</h2>
            </header>
            <aside>
            <img src={Logo} alt="" />
            <Sidebar title= {auth.user.fullname}/>
            </aside>
            <main>
               <div className="containerAvalia">
                    <div className="bemvindo">
                        <h2>Seja Bem vindo ao Ergolist, {auth.user.fullname} </h2>
                        <p>Selecione a opção desejada no menu ao lado</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
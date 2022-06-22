import React, { useContext }  from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import Logo from '../../assets/Logo.jpeg'

import Sidebar from '../home/components/Sidebar';



export default function Avalia(props) {
    const auth = useContext(AuthContext);    

    


    function NewAction( event, title, description) {
        switch (event) {
            case 'list':
            
            default:

        }


    }



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
                <div className="HomeMain">                   
                    <div className="bemvindo">
                        <h2>DashBoards</h2>
                    </div>
                </div>
            </main>
        </div>
    )
}
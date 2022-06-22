import React, { useContext }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import Avatar from '../../../assets/Avatar.svg';

import './compCss.css';


export default function Sidebar(props) {
    const auth = useContext(AuthContext); 
    const navigate = useNavigate(); 



    async function Logout () {
        await auth.signout();
        navigate('/login');
    }
    




    return (
        <div className="Side-1">
                <img src= { Avatar } alt=""/>
                <h2 >{props.title}</h2>
                <h4 >Avaliador</h4>
                <nav className="NavBar">
                    <ul>
                        <li><Link to="/home">Pagina Inicial</Link></li>
                        <li><Link to="/avalia">Minhas avaliações</Link></li>
                        <li><Link to="/avalia/inclui">Nova Avaliação</Link></li>
                        <li><Link to="/dashboard">DashBoard</Link></li>
                        <li><Link to="#" onClick={Logout}>Logout</Link></li>
                    </ul>
                </nav>
 
        </div>
    )
}
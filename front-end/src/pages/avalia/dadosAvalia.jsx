import React, { useContext, useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { AssessmentApi } from '../../services/api';
import Logo from '../../assets/Logo.jpeg'

import Sidebar from '../home/components/Sidebar';

import './avalia.css'


export default function Avalia(props) {
    const auth = useContext(AuthContext);  
    const [notify, setNotify] = useState('');    
    const [title, setTitle] = useState('');
    const [dscription, setDescription] = useState('');
    const api = AssessmentApi();    
    const navigate = useNavigate();

    
function returnPage () {
    navigate('/avalia')
}


async function incluiAssessment(e) {
    e.preventDefault();
    setNotify('');    
    if(title == '' || dscription =='') {
        setNotify("Preencha todos os campos!!!")
    } else {
        const user = auth.user._id
        const isAssess = await api.CreateAssessment(title, dscription, user);
        console.log(isAssess)
        if(isAssess) {
            navigate("/avalia");
        } else{
            setNotify('Ops.!!! algo deu errado, tente novamente.');
        }
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
                <div className="containerlistAvalia">
                    <div className="QdroAvalia">
                        <div className="card1">
                        <form onSubmit={incluiAssessment}>
                                <span>Titulo: </span>
                                <input type="text" name="title" onChange={e => setTitle(e.target.value)}/>
                                <span>Descrição:</span>
                                <textarea name="description" id="" cols="30" rows="10" onChange={e => setDescription(e.target.value)}></textarea>
                                {/* <input type="textarea" name="title" /> */}
                                <div className="qdbtn">                                
                                    <button onClick={() => returnPage()}>Voltar</button>
                                    <button type="submit" >Enviar</button>
                                </div>
                            <h4>{ notify }</h4>                            
                            </form>
                        </div>
                    </div>                            
                </div>
            </main>
        </div>
    )
}
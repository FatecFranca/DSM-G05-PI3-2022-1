import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function Quadro(props) {
    const auth = useContext(AuthContext);    
    const navigate = useNavigate();

    
    function avalia(id) {        
        auth.GetAssessmentId(id)
        navigate('/avalia/grupo')
    }

    
    

    return (
    <>
        <div className="QdroAvalia">
            <div className="card1">
                <div className="cardTitulo">
                    <span>Titulo:</span>
                    <h3> {props.title}</h3>
                </div>
                <div className="carddescrip">
                    <span>Descrição: </span>
                    <p>{props.descrip}</p>
                </div>  
                <div className="qdbtn">
                        <button 
                        onClick={() => avalia()}>Alterar dados</button>
    
                        <button 
                        value={props.cod}                        
                        onClick={() => avalia(props.cod)}>Avaliar</button>
                </div>
            </div>                            
        </div>                            
    </>
)
}
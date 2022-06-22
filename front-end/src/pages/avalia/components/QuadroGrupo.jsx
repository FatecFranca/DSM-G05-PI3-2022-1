import React, { useContext, useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';

// import { AuthContext } from '../../../contexts/AuthContext';



export default function Quadro(props) {
    
    return (


            <div className="boxQues">
                <div className="imgQues">
                </div>
                <div className="contentQues">
                    <h3>{props.title}</h3>                    
                  <p>{props.descrip}</p>
                    <div className="link">                    
                        <Link to={"/avalia/questions"} 
                        onClick={props.click} 
                        > Avaliar </Link>                    
                    </div>
                </div>
            </div>
    )
}
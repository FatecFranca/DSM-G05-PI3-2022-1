import React, { useContext, useEffect, useState }  from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { GroupApi } from '../../services/api';
import Logo from '../../assets/Logo.jpeg'


import Sidebar from '../home/components/Sidebar';
import Quadro from '../avalia/components/QuadroGrupo';

import './avalia.css'

export default function Avalia(props) {
    const auth = useContext(AuthContext);  
    const [group, setGroup] = useState([]);
    const [assessment, setAssessment] = useState([]);
    const ApiGroup = GroupApi();


    useEffect(() =>{
        groupAll();
      }, [])
  
     const groupAll = async () => {
        let data = await ApiGroup.listGroup();

        const idAssess = auth.setAssessmentID();
        const nameAssess = await auth.AssessmentById(idAssess);

        setGroup(data);
        setAssessment(nameAssess.title);

    }
  
     function returnGroup(id) {
      auth.GetGroupId(id)
  }



    return (
        <div className="container">
            <header>
               <h2>Titulo Avaliação: {assessment}</h2>
            </header>
            <aside>
            <img src={Logo} alt="" />
            <Sidebar title= {auth.user.fullname}/>
            </aside>
            <div className="mainGroup">
            <div className="abs">
            {group.map((item, key) =>(
                      <Quadro 
                      key={key}  
                      title={item.group}
                      res ={1}
                      tot ={18} 
                      descrip={item.description}
                      click={()=> returnGroup(item._id)} 
                      idGroup={item._id} />
                   ))}
                </div>
            </div>
        </div>
    )
}
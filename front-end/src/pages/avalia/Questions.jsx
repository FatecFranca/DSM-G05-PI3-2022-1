import React, { useContext, useEffect, useState }  from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { GroupApi } from '../../services/api';
import Logo from '../../assets/Logo.jpeg'

import "./avalia.css";



import Sidebar from '../home/components/Sidebar';
import Quadro from '../avalia/components/QuadroResposta';


export default function Questions(props) {
    const auth = useContext(AuthContext);      
    const [group, setGroup] = useState([]);
    const [name, setName] = useState();
    const [assessment, setAssessment] = useState([]);

     const Api = GroupApi();

     
   useEffect(() =>{
    groupAll();

  }, [])

 const groupAll = async () => {
    const idgroup = auth.setgroupIDselec()
    let data = await Api.listQuestionsByGroupId(idgroup);
    const nameGroup = await Api.listGroupById(idgroup);

    const idAssess = auth.setAssessmentID();
    const nameAssess = await auth.AssessmentById(idAssess);
    
    setGroup(data);
    setName(nameGroup.group);
    setAssessment(nameAssess.title);

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
      <main>


      <div className="containerRes">
        <Quadro 
              group={"Critério: " + name}
              idGroup={group._id}
          />
      </div>
    </main>
  </div>

    )
}
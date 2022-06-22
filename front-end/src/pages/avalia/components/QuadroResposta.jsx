import React, { useContext, useEffect, useState }  from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GroupApi, AnswerAPI } from '../../../services/api';
import Loading from '../../other/loading';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";




export default function Quadro(props) {
    const auth = useContext(AuthContext);      
    const [group, setGroup] = useState([]);
    const [answer, setAnswer] = useState([]);

    
    const [resp, setResp] = useState();
    const [idAssess, setIdAssess] = useState();
    const [value, setValue] = useState();
    const [name, setName] = useState();

    const navigate = useNavigate();


    const Api = GroupApi();
    const ApiAnswer = AnswerAPI();

    useEffect(() =>{
        groupAll();
        questions();
      }, [])

      useEffect(() =>{
        answerAll();
      }, [idAssess])

      function returnPage () {
        navigate('/avalia/grupo')
    }

      const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      };
      



      const answerAll = async () => {
          const idAssess = auth.setAssessmentID();
          const loganswer = await ApiAnswer.listAnswer(idAssess);

          setAnswer(loganswer);
          console.log(group)
          console.log(answer)
        }
        


      const groupAll = async () => {
        const idgroup = auth.setgroupIDselec()
        let data = await Api.listQuestionsByGroupId(idgroup);
        const nameGroup = await Api.listGroupById(idgroup);    
        const idAssess = auth.setAssessmentID();
        
        
        setIdAssess(idAssess)
        setGroup(data);
        setName(nameGroup.group);
    }


         async function handleSubmit (e) {
            let  objective_answer = '';
            let comments ='';
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


         data.assessment =  idAssess;  
         data.objective_answer =  value;  
        
        if(!value) {
            alert("Selecione uma opção")
            return false
        }
        
                
        // incluindo dados
        const answer = await ApiAnswer.CreateAnswer(data.assessment, data.comments, data.objective_answer, data.question);  
        console.log(answer)

        if(answer === 500){
            alert("Ops, aconteceu algo errado na inclusão")
            return false
        }
        setValue('');
        // console.log(data)
    }




     const questions = () => {
        if(group.length <= 0) {
            return <Loading />;
         }

        return (
            
            <Swiper
                    navigation={true}
                    pagination={pagination}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    >
                    {group.length > 0 && group.map((item, key) =>(
                        <SwiperSlide>
                            <div className="cardres">
                        <div className="contentRes">
                            <h2>{item.number}</h2>
                            <h3>{props.group}</h3>
                            <p>{item.enunciation}</p>
                        </div>
                        <div className="qdbtn">
                            <form onSubmit={handleSubmit}>
                            <div className="brn">
                                <button 
                                    type="button" 
                                    name="objective_answer" 
                                    className="classYes" 
                                    value="Y" 
                                    onClick={()=> activeYes()}>sim</button>
                                <button 
                                    type="button" 
                                    name="objective_answer" 
                                    className="classNo" 
                                    value="N" 
                                    onClick={()=> activeNo()}>Não</button>
                                <button 
                                    type="button" 
                                    name="objective_answer" 
                                    className="classNA" 
                                    value="X" 
                                    onClick={()=> activeNa()}>Não aplicavel</button>
                            </div> 
                                <h4>Comentário:</h4>
                                    <input className="idQuest"
                                    type="text" 
                                    name="question" 
                                    defaultValue={item._id} 
                                    
                                    />
                                <textarea 
                                type="textarea" 
                                id="textres"
                                name="comments"  
                                />
                                <div className="btn">
                                    <button onClick={() => returnPage()}>Voltar</button>
                                    <button 
                                    type="button" className="classAR">Adiar Resposta</button>
                                    <button type="submit" >Salvar</button>
                                </div> 
                            </form>
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}                    
                </Swiper>
        )
    }




    function activeYes() {
        const btYes = document.querySelector('.classYes');
        const btNo = document.querySelector('.classNo');
        const btNa = document.querySelector('.classNA');
        
        btYes.classList.add('active');
        btNo.classList.remove('active');
        btNa.classList.remove('active');
        setValue("Y");
    }

    function activeNo() {
        const btYes = document.querySelector('.classYes');
        const btNo = document.querySelector('.classNo');
        const btNa = document.querySelector('.classNA');
    
        btNo.classList.add('active');
        btYes.classList.remove('active');
        btNa.classList.remove('active');
        setValue("N");
    }

    

    function activeNa() {
        const btYes = document.querySelector('.classYes');
        const btNo = document.querySelector('.classNo');
        const btNa = document.querySelector('.classNA');
    
        btNa.classList.add('active');
        btNo.classList.remove('active');
        btYes.classList.remove('active');
        setValue("X");
    }






    
    
    return (
        <>
            {questions()}
        </>
)
}
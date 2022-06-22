import React, { useContext, useEffect, useState }  from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AssessmentApi } from '../../services/api';
import Logo from '../../assets/Logo.jpeg'

import QuadroAval from '../avalia/components/Quadro_aval';
import Sidebar from '../home/components/Sidebar';
import Loading from '../other/loading';

import './avalia.css'
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";




export default function Avalia(props) {
    const auth = useContext(AuthContext);  
    const [assessment, setAssessment] = useState([]);
    const api = AssessmentApi();    


    useEffect(() =>{
        ListAssessm();
        load();
    
      }, [])

      const ListAssessm = async () => {
        const response = await api.listAssessment();
        setAssessment(response)

    }


    const load = () => {

        if(assessment.length <= 0) {
           return <Loading />;
        }
        return (

            <Swiper
            pagination={{
                type: "fraction",
                
            }}
            navigation={true}
            spaceBetween={10}
            modules={[Pagination, Navigation]}
            className="mySwiper">
        {assessment.length > 0 && assessment.map((item, key) =>(
            <SwiperSlide>
            <QuadroAval  
                key={key}
                title={item.title} 
                descrip={item.description} 
                cod={item._id} 
                tam = {key+1}
                />
            </SwiperSlide>
        ))}
    </Swiper>
)

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
                    {load()}
                </div>

            </main>
        </div>
    )
}
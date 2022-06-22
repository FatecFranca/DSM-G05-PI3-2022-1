import React, { useState }  from 'react';


import './login.css'

import CompLog from './componentLogin/Login'
import CompCad from './componentLogin/Cadastro'


export default function Login() {

    function toggleForm () {
        const formLog = document.querySelector('.container');
        const formSection = document.querySelector('section');
        formLog.classList.toggle('active');
        formSection.classList.toggle('active');
    }
    

    return (
        <section>
        <div className="container">
        <CompLog 
            click={() => {toggleForm()}}
        />
        <CompCad 
            click={() => {toggleForm()}}
        />

</div>
    </section>
    )
}
import React, { useEffect, useState }  from 'react';
import { UseApi } from '../../../services/api';

import Fig from '../../../assets/Logo.jpeg'



export default function CadUser(props) {
    const api = UseApi();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [notify, setNotify] = useState('');


    useEffect(() => {
        
    },[])


    function limpNotify () {
        props.click()
        setNotify('')
    }
 
    async function handleSubmit (e) {
        e.preventDefault();
        
        if(validaDados()) {
            //  cadastrar usuários
           const data =  await api.CreateUser(name, email, password)
           if(data === 201){
            setNotify('Usuário cadastrado com sucesso, faça novo login.')
            setName('')
            setEmail('')
            setPassword('')
            setConfPass('')
            return console.log(data)
        } else  {
            setNotify('Ocorreu um erro no cadastro do usuário, tente novamente.')
            return console.log(data + " aqui")
           }

        } 


    }


    function validaDados() {
        if(name === '') {
            setNotify('Informe o nome do usuário!!')
            return  false 
        }
        if(!email) {
            setNotify('Informe o email do usuário!!')
            return false 
        }        
        if(!password) {
            setNotify('Informe uma senha válida!!!!')
            return false
        }        
        if(password !== confPass) {
            setNotify('Senha não confere!!!!')
            return false
        }       
        return true        
    }




    return (
        <div className="user signupBx">
        <div className="formBx">
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    id="cadastro-nome"
                    name="fullname"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="email" 
                    id="cadastro-email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}                    
                />
                <input 
                    type="password" 
                    placeholder="Digite a senha" 
                    id="cadastro-senha"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}                                       
                />
                    <input 
                    type="password" 
                    placeholder="confirme a senha" 
                    id="cadastro-Confsenha"
                    name="passwordConfirm"
                    value={confPass}
                    onChange={e => setConfPass(e.target.value)}                    
                />
                <input type="submit" placeholder="Login" value="Cadastrar"/>
                <p className="signup">Já tem conta? <a href="#" onClick = {() => limpNotify ()} >faça Login</a></p>
                <h3>{ notify }</h3>
            </form>
        </div>
        <div className="imgBx1">
            <div className="boxImg">
                <img src={Fig} alt="" />
            </div>

        </div>
    </div>
    )


}


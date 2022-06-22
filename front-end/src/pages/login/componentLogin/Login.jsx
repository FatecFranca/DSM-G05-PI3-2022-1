import React, { useState, useContext }  from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import Fig from '../../../assets/Logo.jpeg'



export default function Login(props) {
    const auth = useContext(AuthContext);  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotify] = useState('');

    const navigate = useNavigate();


    



    async function handleSubmit (e) {
        e.preventDefault();
        setNotify('');
        if(email == '' && password == '') {
            setNotify('Campos não preenchidos');
        } else {
            // setNotify('Campos preenchidos');


            const isLogged = await auth.signin(email, password);
            if(isLogged) {
                navigate("/home");
            } else{
                setNotify('Login ou usuário invávido.');
            }
        }
    }

    return (
        <div className="user signinBx">
        <div className="imgBx">
            <div className="boxImg">
                <img src={Fig} alt="" />
            </div>
        </div>
        <div className="formBx">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input 
                    type="text" 
                    placeholder="email"
                    id="login-email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    id="login-password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}                    

                    />
                <input type="submit" placeholder="Login" value="Login" href="/home"></input>
                <p className="signup">Não tem uma conta? <a href="#" onClick = {props.click}>Cadastre-se</a></p>
                <h3>{ notify }</h3>
            </form>
        </div>
    </div>
    )


}


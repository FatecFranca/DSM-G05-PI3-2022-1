import { useEffect, useState } from 'react';
import { UseApi, AssessmentApi } from '../services/api';
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [groupId, setGroupId] = useState('');    
    const [assessmentId, setAssessmentId] = useState('');    
    const [nameAssessment, setAssessment] = useState('');    

    const api = UseApi();
    const AssessApi = AssessmentApi();

    useEffect(() => {
        
        validatetoken();
    },[])

    const validatetoken = async() => {
        try {
            const storageData = localStorage.getItem('x-access-token');

            if(storageData) {
                let resp = false;
                const data = await api.validToken(storageData)
                    .catch(function(error) {
                    if (error.response) {
                        console.log("erro erro no authProvider " + error.response.status);


                    }
                    return data;                       
                }
                );
                
                if(data) {
                    const user = await api.UserGetById(data.id)
                    setUser(user);
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const signin = async(email, password) => {
        
        const data = await api.logIn(email, password);
        if(!data) {
            return false;
        }
        if(data.user && data.token) {
            setUser(data.user);
            console.log(data.token)
            console.log(data.user)
            localStorage.setItem('x-access-token', data.token)
            localStorage.setItem('UserLog', data.user.fullname)                
            localStorage.setItem('email', data.user.email)                
            return true;
        }
        console.log(data)
        return false;
    }

    const signout = async () => {
        await api.logOut();
        setUser(null);
            localStorage.setItem('x-access-token', '')
            localStorage.setItem('UserLog', '')                
            localStorage.setItem('email', '')                
    }

    // recuperando o id do assessment
    const GetAssessmentId = (id_assess) => {
        setAssessmentId(id_assess)

    }
    const setAssessmentID = () => {
        return assessmentId;
    }

    const AssessmentById = async(id) => {
        const assess = await AssessApi.listAssessmentById(id);
        return assess;
    }

    // recuperando o id do grupo
    const GetGroupId = (id_group) => {
        setGroupId(id_group)

    }
    const setgroupIDselec = () => {
        return groupId;
    }

    return (
        <AuthContext.Provider value={{ user,
                                       signin, signout, 
                                       GetGroupId, setgroupIDselec, 
                                       GetAssessmentId, setAssessmentID, AssessmentById }}>
            {children}
        </AuthContext.Provider>
    )

}
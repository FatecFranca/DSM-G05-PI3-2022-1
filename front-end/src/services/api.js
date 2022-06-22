import axios from 'axios';

const token = localStorage.getItem('x-access-token');

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {'Content-Type': 'application/json', 'x-access-token': token}

});

// Criar o grupo de Login e cadastro
export const UseApi = ()  => ({
    // Cadastro de usuário
    CreateUser: async(fullname, email, password) => {
        const response = await api.post("user/", { fullname, email, password })
        .catch(function(error) {
            if(error.response) {
                return error.response.status;                    
            }
        })
        return response.status;                    
    },
    // Login 
    logIn: async (email, password) => {
        
        const response = await api.post("user/login", { email, password })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response.status);
                return error.response.status;    
            }            
              
            }
            );
        return response.data;                
        // console.log(response) 
    },
    logOut: async () => {
        const response = await api.post("user/logout");
        return response.data;
    },
    // Validar token
    validToken: async (token) => {
        const response = await api.post("user/validate", { token })
            .catch(function(error) {
                if (error.response) {
                    return false;    
                }                          
            }
            );
        return response.data;        
    },
    // buscar usuario pelo id
    UserGetById: async (id) => {
        const response = await api.get("user/" + id);
        return response.data;        
    }    




});


export const AssessmentApi = ()  => ({
    // Movimentação de Questionarios
    CreateAssessment: async(title, description, user) => {
        const response = await api.post("assessment/", { title, description, user })
        .catch(function(error) {
            if(error.response) {
                return error.response.status;                    
            }
        })
        return response.status;                    
    },
    // Login 
    listAssessment: async () => {
        const response = await api.get("assessment/")
        .catch(function(error) {
            if (error.response) {
                console.log(error.response.status);
                return error.response.status;    
            }                          
        }
        );
        return response.data;                
    },
    listAssessmentById: async (id) => {
        const response = await api.get("assessment/" + id)
        .catch(function(error) {
            if (error.response) {
                console.log(error.response)
                return [];
            }                          
        }
        );
        return response.data;                
    },   

    // buscar usuario pelo id
    UserGetById: async (id) => {
        const response = await api.get("user/" + id);
        return response.data;        
    }    

});


export const AnswerAPI = () => ({

    // lista todas as respostas
    listAnswer: async (id) => {
        const response = await api.get("answer/assessment/" + id);
        return response.data;        
    },
    CreateAnswer: async(assessment, comments, objective_answer, question) => {
        const response = await api.post("answer/", { assessment, comments, objective_answer, question })
        .catch(function(error) {
            if(error.response) {
                return error.response.status;                    
            }
        })
        return response.status;                    
    }        


});



export const GroupApi = () => ({
    // Lista todos os grupos
    listGroup: async () => {
        const response = await api.get("question-group/");
        return response.data;        
    },
    // lista um unico grupo
    listGroupById: async (id) => {
        const response = await api.get("question-group/" + id)
        .catch(function(error) {
                if (error.response.status === 500) {
                    console.log("aqui" + error.response.status);
                    return [];    
                }            
            }
        );
        return response.data;        
    },
    // lista as questões do grupo
    listQuestionsByGroupId: async (id) => {
        const response =  await api.get("question/group/" + id)
        .catch(function(error) {
            console.log(error.response)
            return [];
        });
        return response.data;
    },
    listAssessmentById: async (id) => {
        const response = await api.get("assessment/" + id)
        .catch(function(error) {
            if (error.response) {
                console.log(error.response)
                return [];
            }                          
        }
        );
        return response.data;                
    }    

});


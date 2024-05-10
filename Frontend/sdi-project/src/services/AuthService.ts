import api from '../api/tickets';
import { handleError } from '../handlers/errorHandler';

export const login = async (email: String, password: String) => {
    try {
        const response = await api.post("/auth/authenticate",
            {
                email: email,
                password: password
            }
        );
        const token = response.data.token;
        localStorage.setItem('token', token);
    }catch(error){
        handleError(error);
    }
}

export const register = async (firstName: String, lastName:String, email: String, password: String) => {
    try {
        const response = await api.post("/auth/register",
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        );
        return response.data;
    }catch(error){
        handleError(error);
    }
}
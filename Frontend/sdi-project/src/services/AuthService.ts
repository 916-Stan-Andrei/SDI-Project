import api from '../api/api';
import { handleError } from '../handlers/errorHandler';
import { useUserStore } from '../zustandStores/userStore';
import { fetchRoleFromToken, fetchUserIdFromToken } from './TokenService';

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
        const userID = await fetchUserIdFromToken(token);
        const role = await fetchRoleFromToken(token);

        useUserStore.getState().setRole(role);
        useUserStore.getState().setUserId(userID);
        return response.data;
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
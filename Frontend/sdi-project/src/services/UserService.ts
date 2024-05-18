import api from "../api/api"
import { User } from "../entities/User";

export const getAllUserEmails = async () => {
    try{
        const token = localStorage.getItem('token');
        const response = await api.get("/user/all?role=USER",{
            headers:{
                Authorization: `Bearer ${token}`
            }    
        });
        return response.data.map((user: User) => user.email);
    }catch(error){

    }
}

export const getUserIdByEmail = async (email: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/user/${email}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }    
        });
        return response.data.id;

    }catch (error) {

    }
}
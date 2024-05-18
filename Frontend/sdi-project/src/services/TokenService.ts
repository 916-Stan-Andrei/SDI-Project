import api from "../api/api"

export const fetchUserIdFromToken = async (token: string) => {
    try{
        const response = await api.get("/user/id", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){

    }
}

export const fetchRoleFromToken = async (token: string) => {
    try{
        const response = await api.get("/user/role", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){

    }
}
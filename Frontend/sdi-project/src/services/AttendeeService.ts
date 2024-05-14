import api from '../api/api';
import Attendee from '../entities/Attendee';

const attendeeAPI = "/attendee";

export const fetchAttendeesForTicket = async (ticketId: number) =>{
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`${attendeeAPI}/t${ticketId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
        
    } catch (error) {
        
    }
}

export const getAttendeeById = async  (attendeeId: number) => {
    try{
        const token = localStorage.getItem('token');
        const response = await api.get(`${attendeeAPI}/${attendeeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        return response.data;

    }catch(error){

    }
}

export const updateAttendee = async (attendee: Attendee) => {
    try{
        const token = localStorage.getItem('token');
        await api.put(`${attendeeAPI}/update`, attendee,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
    } catch(error){

    }
}

export const deleteAttendee = async (attendeeId: number) => {
    try{
        const token = localStorage.getItem('token');
        await api.delete(`${attendeeAPI}/delete/${attendeeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    } catch(error){
        
    }
}

export const addAttendee = async(attendee: Attendee) => {
    try{
        const token = localStorage.getItem('token');
        await api.post(`${attendeeAPI}/add`, attendee,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    } catch(error){

    }
}
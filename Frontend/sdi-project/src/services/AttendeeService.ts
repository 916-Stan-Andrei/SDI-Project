import api from '../api/tickets';
import Attendee from '../entities/Attendee';

export const fetchAttendeesForTicket = async (ticketId: number) =>{
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/attendee/t${ticketId}`,
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
        const response = await api.get(`/attendee/${attendeeId}`,
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
        await api.put(`/updateAttendee`, attendee,
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
        await api.delete(`/deleteAttendee/${attendeeId}`,
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
        await api.post(`/addAttendee`, attendee,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    } catch(error){

    }
}
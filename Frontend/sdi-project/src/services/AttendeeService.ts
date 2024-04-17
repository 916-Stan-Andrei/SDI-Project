import api from '../api/tickets';
import Attendee from '../entities/Attendee';

export const fetchAttendeesForTicket = async (ticketId: number) =>{
    try {
        const response = await api.get(`/attendee/t${ticketId}`);
        return response.data;
        
    } catch (error) {
        
    }
}

export const getAttendeeById = async  (attendeeId: number) => {
    try{
        const response = await api.get(`/attendee/${attendeeId}`);
        return response.data;

    }catch(error){

    }
}

export const updateAttendee = async (attendee: Attendee) => {
    try{
        await api.put(`/updateAttendee`, attendee)
    } catch(error){

    }
}

export const deleteAttendee = async (attendeeId: number) => {
    try{
        await api.delete(`/deleteAttendee/${attendeeId}`);
    } catch(error){
        
    }
}

export const addAttendee = async(attendee: Attendee) => {
    try{
        await api.post(`/addAttendee`, attendee);
    } catch(error){

    }
}
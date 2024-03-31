import api from '../api/tickets';
import Ticket from '../entities/Ticket';

interface TicketsProps {
    tickets: Ticket[];
    setTickets: (tickets: Ticket[]) => void;
  }

export const fetchTickets = async ({ tickets, setTickets }: TicketsProps) => {
    try {
        const response = await api.get("/tickets");
        setTickets(response.data);
    } catch (error) {
        console.error("Error fetching tickets!", error);
    } 
}

export const addTicket = async (ticket: Ticket)=> {
    try {
      await api.post('/addTicket', ticket);
      } catch (error) {
        console.error('Error creating ticket:', error);
      }
}

export const deleteTicket = async (ticketId: Number)=>{
  try{
    await api.delete(`/deleteTicket/${ticketId}`);
  } catch (error) {
    console.error("Error deleting ticket: ", error);
  }
}

export const updateTicket = async (ticket: Ticket)=> {
  try{
    await api.put('/updateTicket', ticket)
  } catch(error){
    console.error("Error updating ticket: ", error);
  }
}

export const getTicket = async (ticketId: Number) =>{
  try{
    const response = await api.get(`/ticket/${ticketId}`);
    return response.data;
  }catch(error){
    console.error("Error getting ticket: ", error);
  }
}

export const deleteMultiple = async (ticketIds: Number[]) => {
  try{
    await api.delete('/deleteTickets', { data: ticketIds });
  } catch (error) {
    console.error("Error deleting multiple tickets: ", error);
  }
}
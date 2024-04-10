import api from '../api/tickets';
import Ticket from '../entities/Ticket';
import useTicketStore from '../zustandStores/ticketStore';


export const fetchTickets = async () => {
    try {
        useTicketStore.setState({ ticketsSaved: true });
        
        const response = await api.get("/tickets");
        const tickets = response.data;

        localStorage.setItem('tickets', JSON.stringify(tickets));

        useTicketStore.setState({tickets});
    } catch (error) {
        useTicketStore.setState({ ticketsSaved: false });

        if (error instanceof Error) { 
          console.error("Error fetching tickets!", error.message, error.stack); 
      } else {
          console.error("Error fetching tickets!", error);
      }
        const storedTickets = localStorage.getItem('tickets');
        if (storedTickets) {
          const tickets = JSON.parse(storedTickets);
          useTicketStore.setState({ tickets });
        }
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
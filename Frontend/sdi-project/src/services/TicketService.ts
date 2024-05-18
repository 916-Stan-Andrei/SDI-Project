import api from '../api/api';
import Ticket from '../entities/Ticket';
import useTicketStore from '../zustandStores/ticketStore';

const ticketAPI = "/ticket";


export const fetchTickets = async () => {
    try {
        useTicketStore.setState({ ticketsSaved: true });
        const token = localStorage.getItem('token');
        
        const response = await api.get(`${ticketAPI}/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

export const fetchTicketsByUserId = async (userId: number | null)=> {
  try{
      useTicketStore.setState({ ticketsSaved: true });
      const token = localStorage.getItem('token');
      const response = await api.get(`${ticketAPI}/all/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const tickets = response.data;

    localStorage.setItem('tickets', JSON.stringify(tickets));

    useTicketStore.setState({tickets});

  }catch(error){

  }
}

export const addTicket = async (ticket: Ticket)=> {
    try {
      const token = localStorage.getItem('token');
      await api.post(`${ticketAPI}/add`, ticket,
        {
          headers: {
            Authorization: `Bearer ${token}`
        }
        }
      );
      } catch (error) {
        console.error('Error creating ticket:', error);
      }
}

export const deleteTicket = async (ticketId: Number)=>{
  try{
    const token = localStorage.getItem('token');
    await api.delete(`${ticketAPI}/delete/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
  } catch (error) {
    console.error("Error deleting ticket: ", error);
  }
}

export const updateTicket = async (ticket: Ticket)=> {
  try{
    const token = localStorage.getItem('token');
    await api.put(`${ticketAPI}/update`, ticket,
      {
        headers: {
          Authorization: `Bearer ${token}`
      }
      }
    )
  } catch(error){
    console.error("Error updating ticket: ", error);
  }
}

export const getTicket = async (ticketId: Number) =>{
  try{
    const token = localStorage.getItem('token');
    const response = await api.get(`${ticketAPI}/${ticketId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
      }
      }
    );
    return response.data;
  }catch(error){
    console.error("Error getting ticket: ", error);
  }
}

export const deleteMultiple = async (ticketIds: Number[]) => {
  try{
    const token = localStorage.getItem('token');
    await api.delete(`${ticketAPI}/delete`, { data: ticketIds,
      headers: {
        Authorization: `Bearer ${token}`
    }
     },
      
    );
  } catch (error) {
    console.error("Error deleting multiple tickets: ", error);
  }
}
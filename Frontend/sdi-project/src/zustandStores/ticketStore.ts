import {create} from  'zustand';
import Ticket from '../entities/Ticket';

interface TicketStore{
    tickets: Ticket[];
    ticketsSaved: boolean;
}

const useTicketStore = create<TicketStore>((set) => ({
    tickets: [],
    ticketsSaved: true,
}))

export default useTicketStore;
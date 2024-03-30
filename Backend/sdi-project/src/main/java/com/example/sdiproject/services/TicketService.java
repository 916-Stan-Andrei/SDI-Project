package com.example.sdiproject.services;

import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public void saveTicket(Ticket ticket){ ticketRepository.save(ticket);}

    public List<Ticket> getAllTickets(){ return ticketRepository.findAll();}

    public Ticket getTicketById(int ticketId) { return ticketRepository.findById(ticketId).orElse(null);}

    public void updateTicket(Ticket ticket){
        Ticket existingTicket = ticketRepository.findById(ticket.getId()).orElse(null);
        assert existingTicket != null;
        existingTicket.setEventName(ticket.getEventName());
        existingTicket.setEventDate(ticket.getEventDate());
        existingTicket.setPurchaseDate(ticket.getPurchaseDate());
        existingTicket.setTicketPriorityLevel(ticket.getTicketPriorityLevel());
        existingTicket.setType(ticket.getType());
        ticketRepository.save(existingTicket);
    }

    public void deleteTicket(int ticketId) { ticketRepository.deleteById(ticketId);}
}

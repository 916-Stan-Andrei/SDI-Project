package com.example.sdiproject.services;

import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.repositories.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public void saveTicket(Ticket ticket){
        if (ticket == null) {
            throw new IllegalArgumentException("Ticket object cannot be null");
        }
        ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        if (tickets.isEmpty()) {
            throw new RuntimeException("No tickets found");
        }
        return tickets;
    }

    public Ticket getTicketById(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket == null) {
            throw new IllegalArgumentException("Ticket with ID " + ticketId + " not found");
        }
        return ticket;
    }

    public void updateTicket(Ticket ticket) {
        Ticket existingTicket = ticketRepository.findById(ticket.getId()).orElse(null);
        if (existingTicket == null) {
            throw new IllegalArgumentException("Ticket with ID " + ticket.getId() + " not found");
        }
        existingTicket.setEventName(ticket.getEventName());
        existingTicket.setEventDate(ticket.getEventDate());
        existingTicket.setPurchaseDate(ticket.getPurchaseDate());
        existingTicket.setTicketPriorityLevel(ticket.getTicketPriorityLevel());
        existingTicket.setType(ticket.getType());
        ticketRepository.save(existingTicket);
    }

    public void deleteTicket(int ticketId) {
        if (!ticketRepository.existsById(ticketId)) {
            throw new IllegalArgumentException("Ticket with ID " + ticketId + " not found");
        }
        ticketRepository.deleteById(ticketId);
    }

    @Transactional
    public void deleteMultiple(List<Integer> ticketIds) {
        if (ticketIds == null || ticketIds.isEmpty()) {
            throw new IllegalArgumentException("Ticket IDs cannot be null or empty");
        }
        ticketRepository.deleteTicketsWithIds(ticketIds);
    }
}

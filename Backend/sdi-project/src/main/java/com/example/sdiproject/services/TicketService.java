package com.example.sdiproject.services;

import com.example.sdiproject.DTOs.TicketRequestDTO;
import com.example.sdiproject.DTOs.TicketResponseDTO;
import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.mappers.TicketResponseDTOMapper;
import com.example.sdiproject.repositories.TicketRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TicketResponseDTOMapper ticketResponseDTOMapper;

    public void saveTicket(TicketRequestDTO ticketRequestDTO){
        if (ticketRequestDTO == null) {
            throw new IllegalArgumentException("Ticket object cannot be null");
        }
        Ticket ticket = new Ticket();
        ticket.setType(ticketRequestDTO.type());
        ticket.setTicketPriorityLevel(ticketRequestDTO.ticketPriorityLevel());
        ticket.setPurchaseDate(ticketRequestDTO.purchaseDate());
        ticket.setEventDate(ticketRequestDTO.eventDate());
        ticket.setEventName(ticketRequestDTO.eventName());
        ticketRepository.save(ticket);
    }

    public List<TicketResponseDTO> getAllTickets() {
        return ticketRepository.findAll().stream().map(ticketResponseDTOMapper).collect(Collectors.toList());
    }

    public TicketResponseDTO getTicketById(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket == null) {
            throw new IllegalArgumentException("Ticket with ID " + ticketId + " not found");
        }
        return ticketResponseDTOMapper.apply(ticket);
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
        existingTicket.setAttendees(ticket.getAttendees());
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

package com.example.sdiproject.api;

import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/addTicket")
    public void addTicket(@RequestBody Ticket ticket) {ticketService.saveTicket(ticket);}

    @GetMapping("/tickets")
    public List<Ticket> getAllTickets(){ return ticketService.getAllTickets();}

    @GetMapping("/ticket/{ticketId}")
    public Ticket getTicket(@PathVariable int ticketId) {return ticketService.getTicketById(ticketId);}

    @PutMapping("/updateTicket")
    public void updateTicket(@RequestBody Ticket ticket) { ticketService.updateTicket(ticket);}

    @DeleteMapping("/deleteTicket/{ticketId}")
    public void deleteTicket(@PathVariable int ticketId) { ticketService.deleteTicket(ticketId);}

    @DeleteMapping("/deleteTickets")
    public void deleteTicketsByIds(@RequestBody List<Integer> ticketIds) {
        ticketService.deleteMultiple(ticketIds);
    }

}

package com.example.sdiproject.api;


import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;


    @PostMapping("/addTicket")
    public ResponseEntity<String> addTicket(@RequestBody Ticket ticket) {
        try {
            ticketService.saveTicket(ticket);
            return ResponseEntity.status(HttpStatus.CREATED).body("Ticket added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getAllTickets() {
        try {
            List<Ticket> tickets = ticketService.getAllTickets();
            return ResponseEntity.ok(tickets);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<Ticket> getTicket(@PathVariable int ticketId) {
        try {
            Ticket ticket = ticketService.getTicketById(ticketId);
            return ResponseEntity.ok(ticket);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/updateTicket")
    public ResponseEntity<String> updateTicket(@RequestBody Ticket ticket) {
        try {
            ticketService.updateTicket(ticket);
            return ResponseEntity.status(HttpStatus.OK).body("Ticket updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteTicket/{ticketId}")
    public ResponseEntity<String> deleteTicket(@PathVariable int ticketId) {
        try {
            ticketService.deleteTicket(ticketId);
            return ResponseEntity.status(HttpStatus.OK).body("Ticket deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteTickets")
    public ResponseEntity<String> deleteTicketsByIds(@RequestBody List<Integer> ticketIds) {
        try {
            ticketService.deleteMultiple(ticketIds);
            return ResponseEntity.status(HttpStatus.OK).body("Tickets deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @MessageMapping("/cronAdd")
    @SendTo("/topic/cronjob")
    public void cronJob() {
        addEntity();
    }

    @Scheduled(fixedRate = 15000)
    public void addEntity() {
        Random rand = new Random();
        String name = "name" + rand.nextInt(1000);
        String date = "date" + rand.nextInt(1000);
        String pdate = "pdate" + rand.nextInt(1000);
        String type = "type" + rand.nextInt(1000);
        int priorityLevel = rand.nextInt(1000);

        Ticket newTicket = new Ticket(name, date, pdate, type, priorityLevel);
        ticketService.saveTicket(newTicket);
    }
}


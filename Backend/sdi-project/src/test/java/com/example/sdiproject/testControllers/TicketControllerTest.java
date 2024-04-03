package com.example.sdiproject.testControllers;

import com.example.sdiproject.api.TicketController;
import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.services.TicketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TicketControllerTest {

    @Mock
    private TicketService ticketService;

    @InjectMocks
    private TicketController ticketController;

    @Test
    public void addTicket_ValidTicket_TicketAddedSuccessfully() {
        Ticket validTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        doNothing().when(ticketService).saveTicket(validTicket);

        ResponseEntity<String> response = ticketController.addTicket(validTicket);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Ticket added successfully", response.getBody());
    }

    @Test
    public void addTicket_NullTicket_ReturnsBadRequest() {
        Ticket nullTicket = null;

        ResponseEntity<String> response = ticketController.addTicket(nullTicket);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    public void addTicket_InvalidTicket_ReturnsBadRequestWithMessage() {
        Ticket invalidTicket = new Ticket();
        doThrow(IllegalArgumentException.class).when(ticketService).saveTicket(invalidTicket);

        ResponseEntity<String> response = ticketController.addTicket(invalidTicket);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    public void getAllTickets_ValidTickets_ReturnsListOfTickets() {
        List<Ticket> mockTickets = Arrays.asList(
                new Ticket("Concert 1", "2024-04-10", "2024-04-01", "VIP", 1),
                new Ticket("Concert 2", "2024-04-11", "2024-04-02", "General", 2)
        );
        when(ticketService.getAllTickets()).thenReturn(mockTickets);

        ResponseEntity<List<Ticket>> response = ticketController.getAllTickets();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockTickets, response.getBody());
    }

    @Test
    public void getAllTickets_ServiceThrowsException_ReturnsInternalServerError() {
        when(ticketService.getAllTickets()).thenThrow(new RuntimeException("Internal Server Error"));

        ResponseEntity<List<Ticket>> response = ticketController.getAllTickets();

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void getTicket_ExistingTicket_ReturnsTicket() {
        int ticketId = 123;
        Ticket mockTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        when(ticketService.getTicketById(ticketId)).thenReturn(mockTicket);

        ResponseEntity<Ticket> response = ticketController.getTicket(ticketId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockTicket, response.getBody());
    }

    @Test
    public void getTicket_NonExistingTicket_ReturnsNotFound() {
        int ticketId = 123;
        when(ticketService.getTicketById(ticketId)).thenThrow(new IllegalArgumentException("Ticket not found"));

        ResponseEntity<Ticket> response = ticketController.getTicket(ticketId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    public void updateTicket_ValidTicket_TicketUpdatedSuccessfully() {
        Ticket validTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        doNothing().when(ticketService).updateTicket(validTicket);

        ResponseEntity<String> response = ticketController.updateTicket(validTicket);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Ticket updated successfully", response.getBody());
    }

    @Test
    public void updateTicket_InvalidTicket_ReturnsBadRequestWithMessage() {
        Ticket invalidTicket = new Ticket();
        String errorMessage = "Invalid ticket data";
        doThrow(new IllegalArgumentException(errorMessage)).when(ticketService).updateTicket(invalidTicket);

        ResponseEntity<String> response = ticketController.updateTicket(invalidTicket);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(errorMessage, response.getBody());
    }

    @Test
    public void deleteTicket_ExistingTicket_TicketDeletedSuccessfully() {
        int ticketId = 123;
        doNothing().when(ticketService).deleteTicket(ticketId);

        ResponseEntity<String> response = ticketController.deleteTicket(ticketId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Ticket deleted successfully", response.getBody());
    }

    @Test
    public void deleteTicket_NonExistingTicket_ReturnsNotFoundWithMessage() {
        int ticketId = 123;
        String errorMessage = "Ticket not found";
        doThrow(new IllegalArgumentException(errorMessage)).when(ticketService).deleteTicket(ticketId);

        ResponseEntity<String> response = ticketController.deleteTicket(ticketId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(errorMessage, response.getBody());
    }


}

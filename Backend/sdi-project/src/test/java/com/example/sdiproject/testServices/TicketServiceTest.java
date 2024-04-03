package com.example.sdiproject.testServices;

import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.repositories.TicketRepository;
import com.example.sdiproject.services.TicketService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @Test
    public void saveTicket_ValidTicket_SuccessfullySaved() {
        Ticket validTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        ticketService.saveTicket(validTicket);
        verify(ticketRepository, times(1)).save(validTicket);

        ArgumentCaptor<Ticket> eventCaptor = ArgumentCaptor.forClass(Ticket.class);
        verify(ticketRepository).save(eventCaptor.capture());

        Ticket savedTicket = eventCaptor.getValue();
        assertNotNull(savedTicket);
        assertEquals(validTicket.getId(), savedTicket.getId());
        assertEquals(validTicket.getEventName(), savedTicket.getEventName());
        assertEquals(validTicket.getEventDate(), savedTicket.getEventDate());
        assertEquals(validTicket.getPurchaseDate(), savedTicket.getPurchaseDate());
        assertEquals(validTicket.getType(), savedTicket.getType());
        assertEquals(validTicket.getTicketPriorityLevel(), savedTicket.getTicketPriorityLevel());
    }

    @Test
    public void saveTicket_NullTicket_ThrowsIllegalArgumentException() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ticketService.saveTicket(null);
        });
        assertEquals("Ticket object cannot be null", exception.getMessage());
        verifyNoInteractions(ticketRepository);
    }

    @Test
    public void getAllTickets_ReturnsNonEmptyList_Successfully() {
        List<Ticket> mockTickets = new ArrayList<>();
        mockTickets.add(new Ticket("Concert 1", "2024-04-10", "2024-04-01", "VIP", 1));
        mockTickets.add(new Ticket("Concert 2", "2024-04-11", "2024-04-02", "General", 2));
        when(ticketRepository.findAll()).thenReturn(mockTickets);

        List<Ticket> retrievedTickets = ticketService.getAllTickets();

        assertEquals(mockTickets.size(), retrievedTickets.size());
        assertEquals(mockTickets.get(0), retrievedTickets.get(0));
        assertEquals(mockTickets.get(1), retrievedTickets.get(1));
    }

    @Test
    public void getAllTickets_ReturnsEmptyList_ThrowsRuntimeException() {
        when(ticketRepository.findAll()).thenReturn(new ArrayList<>());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            ticketService.getAllTickets();
        });

        assertEquals("No tickets found", exception.getMessage());
    }

    @Test
    public void getTicketById_TicketFound_ReturnsTicketSuccessfully() {
        int ticketId = 123;
        Ticket mockTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(mockTicket));

        Ticket retrievedTicket = ticketService.getTicketById(ticketId);

        assertEquals(mockTicket, retrievedTicket);
    }

    @Test
    public void getTicketById_TicketNotFound_ThrowsIllegalArgumentException() {
        int ticketId = 123;
        when(ticketRepository.findById(ticketId)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ticketService.getTicketById(ticketId);

        });
        assertEquals("Ticket with ID " + ticketId + " not found", exception.getMessage());
    }

    @Test
    public void updateTicket_ExistingTicket_SuccessfullyUpdated() {
        Ticket existingTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        Ticket updatedTicket = new Ticket("Updated Concert", "2024-04-12", "2024-04-02", "General", 2);
        when(ticketRepository.findById(existingTicket.getId())).thenReturn(Optional.of(existingTicket));

        ticketService.updateTicket(updatedTicket);

        verify(ticketRepository, times(1)).findById(existingTicket.getId());
        verify(ticketRepository, times(1)).save(existingTicket);
        assertEquals(updatedTicket.getEventName(), existingTicket.getEventName());
        assertEquals(updatedTicket.getEventDate(), existingTicket.getEventDate());
        assertEquals(updatedTicket.getPurchaseDate(), existingTicket.getPurchaseDate());
        assertEquals(updatedTicket.getType(), existingTicket.getType());
        assertEquals(updatedTicket.getTicketPriorityLevel(), existingTicket.getTicketPriorityLevel());
    }

    @Test
    public void updateTicket_NonExistingTicket_ThrowsIllegalArgumentException() {
        Ticket nonExistingTicket = new Ticket("Concert", "2024-04-10", "2024-04-01", "VIP", 1);
        when(ticketRepository.findById(nonExistingTicket.getId())).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ticketService.updateTicket(nonExistingTicket);
        });

        assertEquals("Ticket with ID " + nonExistingTicket.getId() + " not found", exception.getMessage());
        verify(ticketRepository, never()).save(any());
    }

    @Test
    public void deleteTicket_ExistingTicket_SuccessfullyDeleted() {
        int ticketId = 123;
        when(ticketRepository.existsById(ticketId)).thenReturn(true);

        ticketService.deleteTicket(ticketId);

        verify(ticketRepository, times(1)).deleteById(ticketId);
    }

    @Test
    public void deleteTicket_NonExistingTicket_ThrowsIllegalArgumentException() {
        int ticketId = 123;
        when(ticketRepository.existsById(ticketId)).thenReturn(false);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            ticketService.deleteTicket(ticketId);
        });

        assertEquals("Ticket with ID " + ticketId + " not found", exception.getMessage());
        verify(ticketRepository, never()).deleteById(anyInt());
    }
}

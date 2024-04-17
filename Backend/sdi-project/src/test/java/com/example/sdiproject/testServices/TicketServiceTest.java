package com.example.sdiproject.testServices;

import com.example.sdiproject.DTOs.TicketRequestDTO;
import com.example.sdiproject.DTOs.TicketResponseDTO;
import com.example.sdiproject.entities.Ticket;
import com.example.sdiproject.mappers.TicketResponseDTOMapper;
import com.example.sdiproject.repositories.TicketRepository;
import com.example.sdiproject.services.TicketService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @Mock
    private TicketResponseDTOMapper ticketResponseDTOMapper;

    @Test
    void saveTicket_ValidRequestDTO_TicketSavedSuccessfully() {
        TicketRequestDTO requestDTO = new TicketRequestDTO("Event", "2024-12-31", "2024-04-21", "Type", 1);
        Ticket expectedTicket = new Ticket();
        when(ticketRepository.save(any(Ticket.class))).thenReturn(expectedTicket);

        assertDoesNotThrow(() -> ticketService.saveTicket(requestDTO));

        verify(ticketRepository, times(1)).save(any(Ticket.class));
    }

    @Test
    void saveTicket_NullRequestDTO_ThrowsIllegalArgumentException() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> ticketService.saveTicket(null));
        assertEquals("Ticket object cannot be null", exception.getMessage());
    }

    @Test
    void getAllTickets_ReturnListOfTickets_Success() {
        // Arrange
        List<Ticket> tickets = new ArrayList<>();
        tickets.add(new Ticket());
        tickets.add(new Ticket());

        when(ticketRepository.findAll()).thenReturn(tickets);

        TicketResponseDTO ticketResponseDTO = new TicketResponseDTO(1,
                "Concert",
                "2024-05-15",
                "2024-04-16",
                "General Admission",
                1,
                new ArrayList<>());
        when(ticketResponseDTOMapper.apply(any(Ticket.class))).thenReturn(ticketResponseDTO);

        List<TicketResponseDTO> result = ticketService.getAllTickets();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(ticketRepository, times(1)).findAll();
        verify(ticketResponseDTOMapper, times(2)).apply(any(Ticket.class));
    }

    @Test
    void getAllTickets_NoTickets_ReturnEmptyList() {
        List<Ticket> tickets = new ArrayList<>();
        when(ticketRepository.findAll()).thenReturn(tickets);

        List<TicketResponseDTO> result = ticketService.getAllTickets();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(ticketRepository, times(1)).findAll();
        verify(ticketResponseDTOMapper, never()).apply(any(Ticket.class));
    }


}

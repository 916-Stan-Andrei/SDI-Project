package com.example.sdiproject.api;

import com.example.sdiproject.DTOs.AttendeeRequestDTO;
import com.example.sdiproject.DTOs.AttendeeResponseDTO;
import com.example.sdiproject.entities.Attendee;
import com.example.sdiproject.services.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;

    @PostMapping("/addAttendee")
    public ResponseEntity<String> addAttendee(@RequestBody AttendeeRequestDTO attendeeRequestDTO){
        try {
            attendeeService.saveAttendee(attendeeRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("Attendee added successfully!");
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/attendees")
    public ResponseEntity<List<AttendeeResponseDTO>> getAllAttendees(@RequestParam(required = false) String sortOrder){
        List<AttendeeResponseDTO> attendees = attendeeService.getAllAttendees(sortOrder);
        return ResponseEntity.ok(attendees);

    }

    @GetMapping("/attendee/{id}")
    public ResponseEntity<?> getAttendeeById(@PathVariable int id){
        try{
            AttendeeResponseDTO AttendeeResponseDTO = attendeeService.getAttendeeById(id);
            return ResponseEntity.ok(AttendeeResponseDTO);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/attendee/t{ticketId}")
    public ResponseEntity<List<AttendeeResponseDTO>> getAllAttendeesByTicketId(@PathVariable int ticketId){
        List<AttendeeResponseDTO> attendeeResponseDTOS = attendeeService.getAllAttendeesByTicketId(ticketId);
        return ResponseEntity.ok(attendeeResponseDTOS);
    }

    @PutMapping("/updateAttendee")
    public ResponseEntity<String> updateAttendee(@RequestBody Attendee newAttendee){
        try{
            System.out.println(newAttendee);
            attendeeService.updateAttendee(newAttendee);
            return ResponseEntity.ok("Attendee updated successfully!");
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/deleteAttendee/{id}")
    public ResponseEntity<String> deleteAttendee(@PathVariable int id){
        try{
            attendeeService.deleteAttendeeById(id);
            return ResponseEntity.ok("Attendee deleted successfully!");
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

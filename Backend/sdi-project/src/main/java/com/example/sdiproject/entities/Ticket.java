package com.example.sdiproject.entities;

import jakarta.persistence.*;
import lombok.ToString;

@Entity
@Table(name = "ticket")
public class Ticket {

    public Ticket(int id, String eventName, String eventDate, String purchaseDate, String type, int ticketPriorityLevel) {
        this.id = id;
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.purchaseDate = purchaseDate;
        this.type = type;
        this.ticketPriorityLevel = ticketPriorityLevel;
    }

    public Ticket() {

    }


    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "event_date")
    private String eventDate;

    @Column(name = "purcahse_date")
    private String purchaseDate;

    @Column(name = "type")
    private String type;

    @Column(name = "ticket_priority")
    private int ticketPriorityLevel;

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", eventDate='" + eventDate + '\'' +
                ", purchaseDate='" + purchaseDate + '\'' +
                ", type='" + type + '\'' +
                ", ticketPriorityLevel=" + ticketPriorityLevel +
                '}';
    }




    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getTicketPriorityLevel() {
        return ticketPriorityLevel;
    }

    public void setTicketPriorityLevel(int ticketPriorityLevel) {
        this.ticketPriorityLevel = ticketPriorityLevel;
    }




}

package com.example.sdiproject.entities;

import jakarta.persistence.*;
import lombok.ToString;

@Entity
@Table(name = "TICKET")
public class Ticket {

    public Ticket(String eventName, String eventDate, String purchaseDate, String type, int ticketPriorityLevel) {
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.purchaseDate = purchaseDate;
        this.type = type;
        this.ticketPriorityLevel = ticketPriorityLevel;
    }

    public Ticket() {

    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "EVENT_NAME")
    private String eventName;

    @Column(name = "EVENT_DATE")
    private String eventDate;

    @Column(name = "PURCHASE_DATE")
    private String purchaseDate;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "TICKET_PRIORITY_LEVEl")
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

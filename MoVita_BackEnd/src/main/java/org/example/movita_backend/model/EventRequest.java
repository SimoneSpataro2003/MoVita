package org.example.movita_backend.model;

import lombok.*;

@Getter
@Setter
public class EventRequest {
    private String title;
    private String description;
    private String date;
    private int price;
    private String address;
    private int maxParticipants;
    private int minAge;
    private int creator;

    // Default constructor
    public EventRequest() {}

    // All-args constructor
    public EventRequest(String title, String description, String date, int price, String address, int maxParticipants, int minAge) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.price = price;
        this.address = address;
        this.maxParticipants = maxParticipants;
        this.minAge = minAge;
    }

    // toString method for debugging/printing the object
    @Override
    public String toString() {
        return "EventRequest{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date='" + date + '\'' +
                ", price=" + price +
                ", address='" + address + '\'' +
                ", maxParticipants=" + maxParticipants +
                ", minAge=" + minAge +
                '}';
    }
}

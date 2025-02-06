package org.example.movita_backend.model;

public class EventRequest {

    private String title;
    private String description;
    private String date;
    private int price;
    private String address;
    private int maxParticipants;
    private int minAge;

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

    // Getter and Setter for title
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // Getter and Setter for description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Getter and Setter for date
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    // Getter and Setter for price
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    // Getter and Setter for address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Getter and Setter for maxParticipants
    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    // Getter and Setter for minAge
    public byte getMinAge() {
        return minAge;
    }

    public void setMinAge(int minAge) {
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

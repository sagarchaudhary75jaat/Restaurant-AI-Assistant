package com.Restruent.dto;

public class ChatResponse {

    private String response;
    private String reply;
    private String status;

    public ChatResponse() {
    }

    public ChatResponse(String response) {
        this.response = response;
        this.reply = response;
        this.status = "SUCCESS";
    }

    public ChatResponse(String response, String status) {
        this.response = response;
        this.reply = response;
        this.status = status;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
        this.reply = response;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
        this.response = reply;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

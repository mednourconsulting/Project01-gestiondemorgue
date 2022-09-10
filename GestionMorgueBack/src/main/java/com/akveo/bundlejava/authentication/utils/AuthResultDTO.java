package com.akveo.bundlejava.authentication.utils;

import java.util.ArrayList;

public class AuthResultDTO {
    protected boolean success;
    protected String response;
    protected String redirect;
    protected ArrayList<String> errors;
    protected ArrayList<String> messages;

    public AuthResultDTO(boolean success) {
        this.success = success;
    }

    public AuthResultDTO() {}

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getRedirect() {
        return redirect;
    }

    public void setRedirect(String redirect) {
        this.redirect = redirect;
    }

    public ArrayList<String> getErrors() {
        return errors;
    }

    public void setErrors(ArrayList<String> errors) {
        this.errors = errors;
    }

    public ArrayList<String> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<String> messages) {
        this.messages = messages;
    }
}

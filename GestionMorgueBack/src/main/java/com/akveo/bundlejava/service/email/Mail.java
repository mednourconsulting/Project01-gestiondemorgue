package com.akveo.bundlejava.service.email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.mail.internet.InternetAddress;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mail {
    private InternetAddress  from;
    private String to;
    private String subject;
    private Map<String, String> model;
}
